import { useState } from 'react'
import { converterArquivo, transferirParaDispositivo } from '../services/converter'
import { prepararSom, tocarConclusao } from '../utils/chime'

const MAX_MB = 50   // confirme o limite com o backend

// Pega a extensão: "livro.EPUB" vira "epub"
const extensao = (nome) => nome.toLowerCase().split('.').pop()

// 1536000 bytes vira "1.5 MB"
const formatarTamanho = (bytes) =>
    bytes < 1024 * 1024
        ? `${Math.max(1, Math.round(bytes / 1024))} KB`
        : `${(bytes / 1024 / 1024).toFixed(1)} MB`

// Gera um identificador único para cada livro da lista.
// crypto.randomUUID só existe em HTTPS ou localhost; o "??" é o plano B.
const novoId = () =>
    crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`

// Este "hook" guarda todo o estado da página do Conversor.
// A página (Converter.jsx) só mostra o que ele devolve no "return" lá embaixo.
//
// IMPORTANTE: nada aqui é salvo no navegador (nem localStorage). A lista e os livros
// convertidos ficam só na memória desta aba e somem ao recarregar ou fechar.
// Não existe função de excluir: apagar um livro é feito só pelo botão físico do dispositivo.
export function useConversor() {
    const [itens, setItens] = useState([])         // lista de livros da sessão
    const [etapa, setEtapa] = useState(0)          // 0 parado | 1 envio | 2 conversão | 3 pronto
    const [progresso, setProgresso] = useState(0)  // 0 a 1, só durante o envio
    const [arquivoAtual, setArquivoAtual] = useState('')
    const [erro, setErro] = useState('')
    const [aviso, setAviso] = useState('')

    const ocupado = etapa === 1 || etapa === 2

    // Muda só alguns campos de um livro da lista (ex.: status)
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

        const id = novoId()
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
            // O resultado (arquivo em braille) fica guardado no item, só em memória
            atualizar(id, { status: 'ready', resultado })
            setEtapa(3)
            setAviso(`Conversão de ${nome} concluída. Pronto para transferir.`)
            tocarConclusao()
        } catch (e) {
            setItens((l) => l.filter((i) => i.id !== id))
            setEtapa(0)
            setArquivoAtual('')
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

    return { itens, etapa, progresso, arquivoAtual, erro, aviso, ocupado, adicionar, transferir }
}