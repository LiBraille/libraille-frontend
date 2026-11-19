import { createContext, useContext, useEffect, useState } from 'react'

// O "contexto" é uma caixa compartilhada: qualquer componente pode ler o tema
// com useTheme(), sem precisar receber por props.
const ThemeContext = createContext(null)

// Descobre o tema inicial: 1º o que a pessoa já escolheu (salvo no navegador),
// 2º a preferência do sistema. O index.html faz o mesmo antes do React carregar.
function getTemaInicial() {
    try {
        const salvo = localStorage.getItem('theme')
        if (salvo === 'light' || salvo === 'dark') return salvo
    } catch { /* localStorage indisponível: segue para a preferência do sistema */ }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(getTemaInicial)

    // Sempre que o tema muda: aplica no <html data-theme="..."> e salva
    useEffect(() => {
        document.documentElement.dataset.theme = theme
        try {
            localStorage.setItem('theme', theme)
        } catch { /* ignora */ }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Uso: const { theme, setTheme } = useTheme()
export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme deve ser usado dentro de <ThemeProvider>')
    return ctx
}