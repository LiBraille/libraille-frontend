import { api } from './api'

// Login: o backend grava o cookie de sessão. Erro 401 = e-mail ou senha incorretos.
export async function entrar({ email, senha }) {
    try {
        return await api('/auth/login', { method: 'POST', corpo: { email, senha } })
    } catch (err) {
        if (err.status === 401) throw new Error('E-mail ou senha incorretos.')
        throw err
    }
}

// Ativação: e-mail + código recebido + senha nova
export const ativarConta = ({ email, codigo, senha }) =>
    api('/auth/ativar', { method: 'POST', corpo: { email, codigo, senha } })

export const sair = () => api('/auth/logout', { method: 'POST' })