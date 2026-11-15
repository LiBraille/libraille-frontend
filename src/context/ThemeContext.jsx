import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ThemeContext = createContext(null)

function getTemaInicial() {
    try {
        const salvo = localStorage.getItem('theme')
        if (salvo === 'light' || salvo === 'dark') return salvo
    } catch { /* localStorage indisponível */ }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(getTemaInicial)

    useEffect(() => {
        document.documentElement.dataset.theme = theme
        try {
            localStorage.setItem('theme', theme)
        } catch { /* ignora */ }
    }, [theme])

    const setTheme = useCallback((novoTema) => setThemeState(novoTema), [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useTheme deve ser usado dentro de <ThemeProvider>')
    return ctx
}