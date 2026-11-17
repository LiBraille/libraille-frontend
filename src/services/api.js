const API_URL = import.meta.env.VITE_API_URL ?? ''

export async function api(caminho, { method = 'GET', corpo } = {}) {
    const res = await fetch(`${API_URL}${caminho}`, {
        method,
        headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
        credentials: 'include',            // envia/recebe o cookie de sessão
        body: corpo ? JSON.stringify(corpo) : undefined,
    })

    const dados = await res.json().catch(() => ({}))

    if (!res.ok) {
        // Aceita { message }, { detail: "texto" } do FastAPI e erros de validação { detail: [...] }
        const detalhe = Array.isArray(dados.detail) ? 'Confira os dados informados.' : dados.detail
        const erro = new Error(dados.message ?? detalhe ?? 'Algo deu errado. Tente novamente.')
        erro.status = res.status
        throw erro
    }

    return dados
}