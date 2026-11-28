// Envio de pedidos (compra ou doação).
// No modo demonstração o pedido é SIMULADO: nada é enviado nem guardado.
import { api } from './api'
import { MODO_DEMO } from './config'

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function enviarPedido(dados) {
    if (MODO_DEMO) {
        await esperar(900)   // parece uma chamada de verdade
        const numero = Math.floor(1000 + Math.random() * 9000)
        console.warn('[LiBraille] Pedido simulado: nenhum dado foi enviado.')
        return { id: `DEMO-${numero}`, demo: true }
    }

    // Pedido real: a rota '/pedidos' precisa ser a combinada com o back-end
    return api('/pedidos', { method: 'POST', corpo: dados })
}