import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa6'
import BrailleBackground from '../../components/BrailleBackground/BrailleBackground'
import { entrar } from '../../services/auth'
import { usePageTitle } from '../../hooks/usePageTitle'
import emblema from '../../assets/logo.png'
import './auth.css'

export default function Auth() {
  usePageTitle('Entrar')   // título da aba: "Entrar | LiBraille"

  const base = useId()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erros, setErros] = useState({})
  const [erroEnvio, setErroEnvio] = useState('')
  const [enviando, setEnviando] = useState(false)

  const emailId = `${base}-email`
  const senhaId = `${base}-senha`

  const enviar = async (e) => {
    e.preventDefault()

    const novos = {}
    if (!/^\S+@\S+\.\S+$/.test(email)) novos.email = 'Informe um e-mail válido.'
    if (!senha) novos.senha = 'Informe sua senha.'
    setErros(novos)
    setErroEnvio('')

    const primeiro = Object.keys(novos)[0]
    if (primeiro) {
      document.getElementById(primeiro === 'email' ? emailId : senhaId)?.focus()
      return
    }

    setEnviando(true)
    try {
      await entrar({ email: email.trim(), senha })
      navigate('/conversor')   // ajuste para a rota do conversor
    } catch (err) {
      setErroEnvio(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="auth">
      {/* O botão "Voltar" fica FORA do painel de fundo: no celular o formulário
      cobre o fundo, e um botão que estivesse dentro dele não receberia o toque.
      data-surface="dark": o botão sempre usa as cores escuras, nos dois temas. */}
      <Link to="/" className="auth-back" data-surface="dark">
        <FaArrowLeft aria-hidden="true" />
        Voltar ao site
      </Link>

      {/* Painel de marca: sempre escuro, nos dois temas */}
      <aside className="auth-brand" data-surface="dark">
        <BrailleBackground />

        <img className="auth-emblem" src={emblema} alt="" />
      </aside>

      <section className="auth-panel" aria-labelledby="auth-titulo">
        <div className="auth-card">

          <h1 id="auth-titulo" className="auth-title">Acesse sua conta</h1>
          <p className="auth-lead">
            Entre com o e-mail da compra e a sua senha. Ainda não ativou a conta?{' '}
            <Link to="/ativar">Use seu código de ativação</Link>.
          </p>

          <form className="auth-form" onSubmit={enviar} noValidate>
            <div className="field">
              <label htmlFor={emailId}>E-mail</label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={erros.email ? 'true' : undefined}
                aria-describedby={erros.email ? `${emailId}-erro` : undefined}
              />
              {erros.email && <p id={`${emailId}-erro`} className="field__error">{erros.email}</p>}
            </div>

            <div className="field">
              <label htmlFor={senhaId}>Senha</label>
              <div className="auth-password">
                <input
                  id={senhaId}
                  type={mostrarSenha ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  aria-invalid={erros.senha ? 'true' : undefined}
                  aria-describedby={erros.senha ? `${senhaId}-erro` : undefined}
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setMostrarSenha((v) => !v)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={mostrarSenha}
                >
                  {mostrarSenha ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                </button>
              </div>
              {erros.senha && <p id={`${senhaId}-erro`} className="field__error">{erros.senha}</p>}
            </div>

            {erroEnvio && <p className="auth-error" role="alert">{erroEnvio}</p>}

            <button type="submit" className="btn btn--primary auth-submit" disabled={enviando}>
              {enviando ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <p className="auth-help">
            Ainda não recebeu seus dados de acesso?{' '}
            <Link to="/contato">Fale com a equipe</Link>
          </p>
        </div>
      </section>
    </main>
  )
}