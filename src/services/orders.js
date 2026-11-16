//Conexão com o Backend para envio de pedidos

const API_URL = import.meta.env.VITE_API_URL ?? ''

export async function enviarPedido(dados) {
    const res = await fetch(`${API_URL}/pedidos`, {   // ajuste a rota
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
    })

    if (!res.ok) {
        let mensagem = 'Não foi possível enviar seu pedido. Tente novamente.'
        try {
            const corpo = await res.json()
            mensagem = corpo.message ?? mensagem
        } catch { /* resposta sem JSON */ }
        throw new Error(mensagem)
    }

    return res.json()   // ex.: { id: 123 }
}