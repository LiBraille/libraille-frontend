// Em desenvolvimento, o Vite repassa /traduzir ao backend (veja vite.config.js).
// Em produção, defina VITE_API_URL no painel da hospedagem.
const API_URL = import.meta.env.VITE_API_URL ?? ''

// Envia o arquivo para o backend converter em braille.
// Usa XMLHttpRequest porque o fetch não informa o progresso do envio.
export function converterArquivo(arquivo, { onProgress } = {}) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.open('POST', `${API_URL}/traduzir?tabela=ptbr`)
        // Sem xhr.withCredentials: o cookie de login não é enviado (conversor aberto no Demo Day).
        // Quando o conversor passar a exigir conta, volte com: xhr.withCredentials = true
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
        xhr.onerror = () => reject(new Error('Não foi possível conectar ao servidor. Verifique a internet e tente de novo.'))

        const form = new FormData()
        form.append('arquivo', arquivo)    // nome do campo combinado com o backend
        xhr.send(form)
    })
}

// ATENÇÃO: TRANSFERÊNCIA SIMULADA.
// Por enquanto esta função NÃO envia nada ao dispositivo: só espera um instante.
// Quando o envio real (Wi-Fi ou USB-C) existir, o código entra aqui, e só aqui.
export async function transferirParaDispositivo(resultado) {
    // Sem conteúdo convertido não há o que transferir. O "?." evita erro se resultado for undefined.
    if (!resultado?.binario_base64) {
        throw new Error('O conteúdo convertido não está mais disponível. Converta o arquivo novamente.')
    }

    console.warn('[LiBraille] Transferência simulada: nenhum dado foi enviado ao dispositivo.')
    await new Promise((resolve) => setTimeout(resolve, 400))
}