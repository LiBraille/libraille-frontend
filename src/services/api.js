const API_URL = import.meta.env.VITE_API_URL ?? ''

// Função única para falar com o backend (login, ativação, pedidos...).
// Uso: const dados = await api('/pedidos', { method: 'POST', corpo: {...} })
export async function api(caminho, { method = 'GET', corpo } = {}) {
    let res
    try {
        res = await fetch(`${API_URL}${caminho}`, {
            method,
            headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
            credentials: 'include',            // envia/recebe o cookie de sessão
            body: corpo ? JSON.stringify(corpo) : undefined,
        })
    } catch {
        // O fetch só falha assim quando não consegue falar com o servidor
        throw new Error('Não foi possível conectar ao servidor. Verifique a internet e tente de novo.')
    }

    const dados = await res.json().catch(() => ({}))

    if (!res.ok) {
        // Escolhe uma mensagem que faça sentido para quem usa o site
        let mensagem = 'Algo deu errado. Tente novamente.'
        if (res.status === 404) mensagem = 'Este recurso ainda não está disponível.'
        else if (Array.isArray(dados.detail)) mensagem = 'Confira os dados informados.'
        else if (typeof dados.message === 'string') mensagem = dados.message
        else if (typeof dados.detail === 'string') mensagem = dados.detail

        const erro = new Error(mensagem)
        erro.status = res.status   // o auth.js usa isto para tratar o 401
        throw erro
    }

    return dados
}