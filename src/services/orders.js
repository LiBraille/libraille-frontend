// Envio de pedidos (compra ou doação) para o backend.
// A rota '/pedidos' precisa ser a mesma combinada com a equipe do backend.
import { api } from './api'

export const enviarPedido = (dados) => api('/pedidos', { method: 'POST', corpo: dados })