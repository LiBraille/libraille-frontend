const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

// Usa XMLHttpRequest porque o fetch não informa o progresso do upload
export function converterArquivo(arquivo, { onProgress } = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', `${API_URL}/traduzir?tabela=ptbr`)
        xhr.responseType = 'json'

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) onProgress?.('upload', e.loaded / e.total)
        }
        xhr.upload.onload = () => onProgress?.('convertendo')

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.response)
            const r = xhr.response
            reject(new Error(
                (typeof r?.detail === 'string' && r.detail) || r?.message ||
                (xhr.status === 401 ? 'Sua sessão expirou. Entre novamente.' : 'Não foi possível converter o arquivo.')
            ))
        }
        xhr.onerror = () => reject(new Error('Falha de conexão. Verifique se o backend está rodando.'))

        const form = new FormData()
        form.append('arquivo', arquivo)
        xhr.send(form)
    })
}

// Baixa o arquivo .bin gerado na conversão (escopo sem hardware)
export async function transferirParaDispositivo(resultado) {
    if (!resultado?.binario_base64) {
        throw new Error('Conteúdo binário (.bin) indisponível para este arquivo.')
    }

    const binarioString = atob(resultado.binario_base64)
    const bytes = new Uint8Array(binarioString.length)
    for (let i = 0; i < binarioString.length; i++) {
        bytes[i] = binarioString.charCodeAt(i)
    }

    const blob = new Blob([bytes], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const nomeArquivo = resultado.nome_arquivo_binario || 'livro_braille.bin'

    const link = document.createElement('a')
    link.href = url
    link.download = nomeArquivo
    document.body.appendChild(link)
    link.click()
    link.remove()

    setTimeout(() => URL.revokeObjectURL(url), 1000)
}