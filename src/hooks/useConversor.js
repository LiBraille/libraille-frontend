import { useState } from 'react'
import { converterArquivo, transferirParaDispositivo } from '../services/converter'
import { prepararSom, tocarConclusao } from '../utils/chime'

const MAX_MB = 50   // confirme o limite com o backend

const extensao = (nome) => nome.toLowerCase().split('.').pop()

const formatarTamanho = (bytes) =>
    bytes < 1024 * 1024
        ? `${Math.max(1, Math.round(bytes / 1024))} KB`
        : `${(bytes / 1024 / 1024).toFixed(1)} MB`

export function useConversor() {
    const [itens, setItens] = useState([])
    const [etapa, setEtapa] = useState(0)          // 0 parado | 1 envio | 2 conversão | 3 pronto
    const [progresso, setProgresso] = useState(0)  // 0 a 1, só no envio
    const [arquivoAtual, setArquivoAtual] = useState('')
    const [erro, setErro] = useState('')
    const [aviso, setAviso] = useState('')

    const ocupado = etapa === 1 || etapa === 2
    const atualizar = (id, dados) =>
        setItens((lista) => lista.map((i) => (i.id === id ? { ...i, ...dados } : i)))

    async function adicionar(arquivo) {
        if (!arquivo || ocupado) return
        prepararSom()   // este clique libera o som para o final da conversão
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
            atualizar(id, { status: 'ready', resultado })
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
            await transferirParaDispositivo(item.resultado)
            atualizar(id, { status: 'transferred', resultado: null })   // libera o conteúdo da memória
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
        setItens((l) => l.filter((i) => i.id !== id))
        if (item) setAviso(`${item.nome} removido da lista.`)
    }

    return { itens, etapa, progresso, arquivoAtual, erro, aviso, ocupado, adicionar, transferir, excluir }
}