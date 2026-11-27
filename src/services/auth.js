import { api } from './api'

// MODO DEMONSTRAÇÃO (Demo Day)
// true  = login e ativação são simulados e NÃO falam com o back-end.
// false = usa o back-end de verdade (rotas /auth/...).
// Para o login real, mude para false.
export const MODO_DEMO = true

// Conta e código de teste. NÃO use uma senha real aqui:
// qualquer pessoa consegue ler este arquivo pelo navegador.
export const CONTA_DEMO = { email: 'demo@libraille.com', senha: 'libraille2026' }
export const CODIGO_DEMO = 'DEMO-2026'

// Espera um pouco, para parecer uma chamada de verdade
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function entrar({ email, senha }) {
    if (MODO_DEMO) {
        await esperar(600)
        const confere =
            email.trim().toLowerCase() === CONTA_DEMO.email && senha === CONTA_DEMO.senha
        if (!confere) throw new Error('E-mail ou senha incorretos.')
        return { demo: true }
    }

    // Login real: o back-end grava o cookie de sessão. Erro 401 = dados incorretos
    try {
        return await api('/auth/login', { method: 'POST', corpo: { email, senha } })
    } catch (err) {
        if (err.status === 401) throw new Error('E-mail ou senha incorretos.')
        throw err
    }
}

export async function ativarConta({ email, codigo, senha }) {
    if (MODO_DEMO) {
        await esperar(600)
        if (codigo.trim().toUpperCase() !== CODIGO_DEMO) {
            throw new Error('Código inválido ou expirado.')
        }
        return { demo: true }
    }
    return api('/auth/ativar', { method: 'POST', corpo: { email, codigo, senha } })
}

export async function sair() {
    if (MODO_DEMO) return
    return api('/auth/logout', { method: 'POST' })
}