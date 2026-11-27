import { createContext, useContext, useState } from 'react'
import { sair as sairNoServidor } from '../services/auth'

// O contexto é uma caixa compartilhada: qualquer componente pode saber se a pessoa
// entrou, com useAuth(), sem receber por props.
const AuthContext = createContext(null)

// Guardamos só um marcador (nenhum dado pessoal). O sessionStorage dura enquanto a aba
// está aberta: dá para recarregar a página na apresentação sem perder o login,
// e ao fechar a aba a sessão some (bom para computadores compartilhados).
const CHAVE = 'libraille_sessao_demo'

function lerSessao() {
    try {
        return sessionStorage.getItem(CHAVE) === '1'
    } catch {
        return false
    }
}

export function AuthProvider({ children }) {
    const [logado, setLogado] = useState(lerSessao)

    // Chamada pela tela de login depois que o login deu certo
    const registrarEntrada = () => {
        try { sessionStorage.setItem(CHAVE, '1') } catch { /* ignora */ }
        setLogado(true)
    }

    const sair = () => {
        try { sessionStorage.removeItem(CHAVE) } catch { /* ignora */ }
        setLogado(false)
        sairNoServidor().catch(() => {})   // no modo demonstração não faz nada
    }

    return (
        <AuthContext.Provider value={{ logado, registrarEntrada, sair }}>
            {children}
        </AuthContext.Provider>
    )
}

// Uso: const { logado, sair } = useAuth()
export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
    return ctx
}