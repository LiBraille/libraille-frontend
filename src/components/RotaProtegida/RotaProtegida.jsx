import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// Envolve as rotas que exigem login. Sem login, leva para /login e guarda de onde
// a pessoa veio ("de"), para voltar para lá depois de entrar.
// ATENÇÃO: isto só esconde as telas. A proteção real precisa estar no back-end.
export default function RotaProtegida() {
    const { logado } = useAuth()
    const location = useLocation()

    if (!logado) {
        return <Navigate to="/login" replace state={{ de: location.pathname }} />
    }

    return <Outlet />   // mostra a página da rota
}