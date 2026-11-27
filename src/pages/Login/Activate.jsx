import { useId, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa6'
import BrailleBackground from '../../components/BrailleBackground/BrailleBackground'
import { ativarConta, MODO_DEMO, CODIGO_DEMO } from '../../services/auth'
import { usePageTitle } from '../../hooks/usePageTitle'
import emblema from '../../assets/logo.png'
import './auth.css'

const MIN_SENHA = 8

function validar({ email, codigo, senha, confirmar }) {
  const e = {}
  if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Informe um e-mail válido.'
  if (codigo.replace(/[^A-Za-z0-9]/g, '').length < 6) e.codigo = 'Informe o código que você recebeu por e-mail.'
  if (senha.length < MIN_SENHA) e.senha = `A senha deve ter pelo menos ${MIN_SENHA} caracteres.`
  if (confirmar !== senha) e.confirmar = 'As senhas não são iguais.'
  return e
}

function CampoSenha({ id, label, valor, aoMudar, erro, mostrar, aoAlternar, autoComplete, ajuda }) {
  const descricao = [erro && `${id}-erro`, ajuda && `${id}-ajuda`].filter(Boolean).join(' ')

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="auth-password">
        <input
          id={id}
          type={mostrar ? 'text' : 'password'}
          autoComplete={autoComplete}
          value={valor}
          onChange={(e) => aoMudar(e.target.value)}
          aria-invalid={erro ? 'true' : undefined}
          aria-describedby={descricao || undefined}
        />
        <button
          type="button"
          className="auth-eye"
          onClick={aoAlternar}
          aria-label={mostrar ? `Ocultar ${label.toLowerCase()}` : `Mostrar ${label.toLowerCase()}`}
          aria-pressed={mostrar}
        >
          {mostrar ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
        </button>
      </div>
      {ajuda && <p id={`${id}-ajuda`} className="field__help">{ajuda}</p>}
      {erro && <p id={`${id}-erro`} className="field__error">{erro}</p>}
    </div>
  )
}

export default function Activate() {
  usePageTitle('Ativar conta')   // título da aba: "Ativar conta | LiBraille"

  const base = useId()
  const navigate = useNavigate()

  const [valores, setValores] = useState({ email: '', codigo: '', senha: '', confirmar: '' })
  const [mostrar, setMostrar] = useState({ senha: false, confirmar: false })
  const [erros, setErros] = useState({})
  const [erroEnvio, setErroEnvio] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [concluido, setConcluido] = useState(false)

  const id = (campo) => `${base}-${campo}`
  const mudar = (campo) => (valor) => setValores((v) => ({ ...v, [campo]: valor }))
  const alternar = (campo) => () => setMostrar((m) => ({ ...m, [campo]: !m[campo] }))

  const enviar = async (e) => {
    e.preventDefault()
    const novos = validar(valores)
    setErros(novos)
    setErroEnvio('')

    const primeiro = Object.keys(novos)[0]
    if (primeiro) {
      document.getElementById(id(primeiro))?.focus()
      return
    }

    setEnviando(true)
    try {
      await ativarConta({
        email: valores.email.trim(),
        codigo: valores.codigo.trim().toUpperCase(),
        senha: valores.senha,
      })
      setConcluido(true)
    } catch (err) {
      setErroEnvio(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="auth">
      <Link to="/" className="auth-back">
        <FaArrowLeft aria-hidden="true" />
        Voltar ao site
      </Link>
      <aside className="auth-brand" data-surface="dark">
        <BrailleBackground />


        <img className="auth-emblem" src={emblema} alt="" />
      </aside>

      <section className="auth-panel" aria-labelledby={id('titulo')}>
        <div className="auth-card">

          {concluido ? (
            <div className="auth-success" role="status">
              <span className="auth-success__icon" aria-hidden="true"><FaCheck /></span>
              <h1 id={id('titulo')} className="auth-title">Conta ativada!</h1>
              <p className="auth-lead">
                Sua senha foi criada. Agora é só entrar com o seu e-mail e a nova senha.
              </p>
              <button
                type="button"
                className="btn btn--primary auth-submit"
                onClick={() => navigate('/login')}
                autoFocus
              >
                Ir para o login
              </button>
            </div>
          ) : (
            <>
              <h1 id={id('titulo')} className="auth-title">Ative sua conta</h1>
              <p className="auth-lead">
                Digite o e-mail da compra e o código de ativação que enviamos para você.
                Depois, crie a sua senha.
              </p>
              {MODO_DEMO && (
                <div className="auth-demo">
                  <p><strong>Modo demonstração.</strong> Use o código <code>{CODIGO_DEMO}</code>.</p>
                  <p>A ativação é simulada e não cria uma conta. Depois, entre com a conta de teste da tela de login.</p>
                </div>
              )}

              <form className="auth-form" onSubmit={enviar} noValidate>
                <div className="field">
                  <label htmlFor={id('email')}>E-mail</label>
                  <input
                    id={id('email')}
                    type="email"
                    autoComplete="email"
                    placeholder="exemplo@email.com"
                    value={valores.email}
                    onChange={(e) => mudar('email')(e.target.value)}
                    aria-invalid={erros.email ? 'true' : undefined}
                    aria-describedby={erros.email ? `${id('email')}-erro` : undefined}
                  />
                  {erros.email && <p id={`${id('email')}-erro`} className="field__error">{erros.email}</p>}
                </div>

                <div className="field">
                  <label htmlFor={id('codigo')}>Código de ativação</label>
                  <input
                    id={id('codigo')}
                    className="auth-code"
                    type="text"
                    autoComplete="one-time-code"
                    autoCapitalize="characters"
                    spellCheck="false"
                    placeholder="XXXX-XXXX"
                    value={valores.codigo}
                    onChange={(e) => mudar('codigo')(e.target.value.toUpperCase())}
                    aria-invalid={erros.codigo ? 'true' : undefined}
                    aria-describedby={erros.codigo ? `${id('codigo')}-erro` : undefined}
                  />
                  {erros.codigo && <p id={`${id('codigo')}-erro`} className="field__error">{erros.codigo}</p>}
                </div>

                <CampoSenha
                  id={id('senha')}
                  label="Nova senha"
                  valor={valores.senha}
                  aoMudar={mudar('senha')}
                  erro={erros.senha}
                  mostrar={mostrar.senha}
                  aoAlternar={alternar('senha')}
                  autoComplete="new-password"
                  ajuda={`Use pelo menos ${MIN_SENHA} caracteres.`}
                />

                <CampoSenha
                  id={id('confirmar')}
                  label="Confirmar senha"
                  valor={valores.confirmar}
                  aoMudar={mudar('confirmar')}
                  erro={erros.confirmar}
                  mostrar={mostrar.confirmar}
                  aoAlternar={alternar('confirmar')}
                  autoComplete="new-password"
                />

                {erroEnvio && <p className="auth-error" role="alert">{erroEnvio}</p>}

                <button type="submit" className="btn btn--primary auth-submit" disabled={enviando}>
                  {enviando ? 'Ativando…' : 'Ativar conta'}
                </button>
              </form>

              <p className="auth-help">
                Já ativou a sua conta? <Link to="/login">Entrar</Link>
              </p>
            </>
          )}
        </div>
      </section>
    </main>
  )
}