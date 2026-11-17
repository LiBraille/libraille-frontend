// const API_URL = import.meta.env.VITE_API_URL ?? ''

// export async function entrar({ email, senha }) {
//     const res = await fetch(`${API_URL}/auth/login`, {   // ajuste a rota
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include',   // permite que o servidor grave o cookie de sessão
//         body: JSON.stringify({ email, senha }),
//     })

//     if (res.status === 401) throw new Error('E-mail ou senha incorretos.')
//     if (!res.ok) throw new Error('Não foi possível entrar agora. Tente novamente.')

//     return res.json()
// }

import { api } from './api'

export async function entrar({ email, senha }) {
    try {
        return await api('/auth/login', { method: 'POST', corpo: { email, senha } })
    } catch (err) {
        if (err.status === 401) throw new Error('E-mail ou senha incorretos.')
        throw err
    }
}

export const ativarConta = ({ email, codigo, senha }) =>
    api('/auth/ativar', { method: 'POST', corpo: { email, codigo, senha } })

export const sair = () => api('/auth/logout', { method: 'POST' })