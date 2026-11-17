import { api } from './api'

const API_URL = import.meta.env.VITE_API_URL ?? ''

// Usa XMLHttpRequest porque o fetch não informa o progresso do upload
export function converterArquivo(arquivo, { onProgress } = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', `${API_URL}/conversor/converter`)   // ajuste a rota
        xhr.withCredentials = true
        xhr.responseType = 'json'

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) onProgress?.('upload', e.loaded / e.total)
        }
        xhr.upload.onload = () => onProgress?.('convertendo')   // enviado: o servidor está convertendo

        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) return resolve(xhr.response)
            const r = xhr.response
            reject(new Error(
                (typeof r?.detail === 'string' && r.detail) || r?.message ||
                (xhr.status === 401 ? 'Sua sessão expirou. Entre novamente.' : 'Não foi possível converter o arquivo.')
            ))
        }
        xhr.onerror = () => reject(new Error('Falha de conexão. Verifique a internet e tente de novo.'))

        const form = new FormData()
        form.append('arquivo', arquivo)    // nome do campo: combine com o backend
        xhr.send(form)
    })
}

// Envia o livro convertido ao dispositivo (Wi-Fi ou USB-C, conforme o backend)
export const transferirParaDispositivo = (resultado) =>
    api('/conversor/transferir', { method: 'POST', corpo: { resultado } })