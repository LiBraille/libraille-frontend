import { useEffect, useState } from 'react'
import { converterArquivo, transferirParaDispositivo } from '../services/converter'
import { prepararSom, tocarConclusao } from '../utils/chime'

const MAX_MB = 50  // confirme o limite com o backend
const STORAGE_KEY = 'libraille_livros_sessao'

// Guarda os resultados convertidos em memória enquanto a aba estiver aberta
const resultadosEmMemoria = new Map()

const extensao = (nome) => nome.toLowerCase().split('.').pop()

const formatarTamanho = (bytes) =>
    bytes < 1024 * 1024
        ? `${Math.max(1, Math.round(bytes / 1024))} KB`
        : `${(bytes / 1024 / 1024).toFixed(1)} MB`

function carregarItensSalvos() {
    try {
        const salvo = localStorage.getItem(STORAGE_KEY)
        if (!salvo) return []
        const lista = JSON.parse(salvo)
        // Se estava no meio de uma conversão/transferência antes do F5, volta para 'ready'
        return Array.isArray(lista)
            ? lista.map((item) =>
                  item.status === 'processing' || item.status === 'transferring'
                      ? { ...item, status: 'ready' }
                      : item
              )
            : []
    } catch {
        return []
    }
}

export function useConversor() {
    const [itens, setItens] = useState(carregarItensSalvos)
    const [etapa, setEtapa] = useState(0)          // 0 parado | 1 envio | 2 conversão | 3 pronto
    const [progresso, setProgresso] = useState(0)  // 0 a 1, só no envio
    const [arquivoAtual, setArquivoAtual] = useState('')
    const [erro, setErro] = useState('')
    const [aviso, setAviso] = useState('')

    // Sempre que a lista mudar, salva apenas os metadados leves no localStorage
    useEffect(() => {
        try {
            const dadosLeves = itens.map(({ id, nome, tamanho, status }) => ({
                id,
                nome,
                tamanho,
                status,
            }))
            localStorage.setItem(STORAGE_KEY, JSON.stringify(dadosLeves))
        } catch {
            // Ignora caso o navegador bloqueie storage
        }
    }, [itens])

    const ocupado = etapa === 1 || etapa === 2
    const atualizar = (id, dados) =>
        setItens((lista) => lista.map((i) => (i.id === id ? { ...i, ...dados } : i)))

    async function adicionar(arquivo) {
        if (!arquivo || ocupado) return
        prepararSom() // este clique libera o som para o final da conversão
        setErro('')

        if (!['txt', 'epub'].includes(extensao(arquivo.name))) {
            setErro('Envie apenas arquivos EPUB ou TXT.')
            return
        }
        if (arquivo.size > MAX_MB * 1024 * 1024) {
            setErro(`O arquivo é grande demais. O limite é ${MAX_MB} MB.`)
            return
        }

        const id = crypto.randomUUID()
        const nome = arquivo.name
        setItens((l) => [{ id, nome, tamanho: formatarTamanho(arquivo.size), status: 'processing' }, ...l])
        setArquivoAtual(nome)
        setProgresso(0)
        setEtapa(1)
        setAviso(`Enviando ${nome}.`)

        try {
            const resultado = await converterArquivo(arquivo, {
                onProgress: (fase, p) => {
                    if (fase === 'upload') setProgresso(p)
                    if (fase === 'convertendo') {
                        setEtapa(2)
                        setAviso(`Convertendo ${nome} para braille.`)
                    }
                },
            })
            resultadosEmMemoria.set(id, resultado)
            atualizar(id, { status: 'ready' })
            setEtapa(3)
            setAviso(`Conversão de ${nome} concluída. Pronto para transferir.`)
            tocarConclusao()
        } catch (e) {
            setItens((l) => l.filter((i) => i.id !== id))
            setEtapa(0)
            setAviso('')
            setErro(e.message)
        }
    }

    async function transferir(id) {
        const item = itens.find((i) => i.id === id)
        if (!item) return
        prepararSom() 
        setErro('')
        atualizar(id, { status: 'transferring' })
        setAviso(`Transferindo ${item.nome} para o dispositivo.`)
        try {
            const resultado = resultadosEmMemoria.get(id)
            await transferirParaDispositivo(resultado)
            resultadosEmMemoria.delete(id)
            atualizar(id, { status: 'transferred' })
            setAviso(`Transferência de ${item.nome} concluída.`)
            tocarConclusao()
        } catch (e) {
            atualizar(id, { status: 'ready' })
            setAviso('')
            setErro(e.message)
        }
    }

    function excluir(id) {
        const item = itens.find((i) => i.id === id)
        resultadosEmMemoria.delete(id)
        setItens((l) => l.filter((i) => i.id !== id))
        if (item) setAviso(`${item.nome} removido da lista.`)
    }

    return { itens, etapa, progresso, arquivoAtual, erro, aviso, ocupado, adicionar, transferir, excluir }
}