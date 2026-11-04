import React, { useState, useRef, useEffect } from "react";
import "./auth.css";

// Imagens, logos e Icones
import logoDarkMode from "../../assets/logo-dark-mode.png";
import logoCentral from "../../assets/logo2.png";
import iconeApple from "../../assets/apple.svg";

export default function Auth({ onVoltar }) {
  const [estaNoLogin, setEstaNoLogin] = useState(true);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  return (
    <main className="pagina-autenticacao">
      {/* PAINEL LATERAL ESQUERDO */}
      <aside className="painel-lateral-esquerdo">
        <button
          type="button"
          className="botao-voltar"
          onClick={onVoltar || (() => window.history.back())}
        >
          <svg
            className="icone-voltar"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Voltar
        </button>

        {/* Pontos em Braille decorativos */}
        <div className="matriz-pontos-braille" aria-hidden="true">
          <div className="coluna-pontos">
            <span className="ponto-braille ponto-azul"></span>
            <span className="ponto-braille ponto-azul"></span>
            <span className="ponto-braille ponto-azul"></span>
          </div>
          <div className="coluna-pontos coluna-deslocada">
            <span className="ponto-braille ponto-indigo"></span>
            <span className="ponto-braille ponto-indigo"></span>
          </div>
          <span className="ponto-braille ponto-isolado"></span>
        </div>

        {/* logo Central */}
        <div className="container-emblema-central">
          <img
            src={logoCentral}
            alt="Emblema LiBraille"
            className="imagem-emblema"
          />
        </div>

        {/* Pontos inferiores decorativos */}
        <div className="pontos-inferiores" aria-hidden="true">
          <span className="ponto-braille ponto-opaco"></span>
          <span className="ponto-braille ponto-opaco"></span>
          <span className="ponto-braille ponto-opaco"></span>
        </div>
      </aside>

      {/* PAINEL DIREITO (Formulário) */}
      <section className="painel-formulario-direito">
        {/* Adicionada a classe card-login apenas quando está no login */}
        <div className={`card-formulario ${estaNoLogin ? "card-login" : ""}`}>
          {/* Logo do Topo */}
          <div className="cabecalho-logo">
            <img
              src={logoDarkMode}
              alt="LiBraille"
              className="imagem-logo-topo"
            />
          </div>

          {/* Abas alternantes entre Login e Cadastro */}
          <nav className="container-abas">
            <button
              type="button"
              className={`botao-aba ${estaNoLogin ? "aba-ativa" : ""}`}
              onClick={() => setEstaNoLogin(true)}
            >
              Fazer Login
            </button>

            <button
              type="button"
              className={`botao-aba ${!estaNoLogin ? "aba-ativa" : ""}`}
              onClick={() => setEstaNoLogin(false)}
            >
              Fazer Cadastro
            </button>

            {/* Barra deslizante com animação */}
            <span
              className={`indicador-aba ${estaNoLogin ? "posicao-login" : "posicao-cadastro"}`}
            />
          </nav>

          <form
            key={estaNoLogin ? "aba-login" : "aba-cadastro"}
            className={`formulario-autenticacao ${estaNoLogin ? "modo-login" : ""} animar-formulario`}
            onSubmit={(e) => e.preventDefault()}
          >
            {!estaNoLogin && (
              <div className="grupo-campo">
                <label className="rotulo-campo" htmlFor="nome">
                  Nome
                </label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Nome Completo"
                  className="campo-entrada"
                  autoComplete="name"
                />
              </div>
            )}

            <div className="grupo-campo">
              <label className="rotulo-campo" htmlFor="email">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="Exemplo@gmail.com"
                className="campo-entrada"
                autoComplete="email"
              />
            </div>

            <div className="grupo-campo">
              <label className="rotulo-campo" htmlFor="senha">
                Senha
              </label>
              <div className="container-input-senha">
                <input
                  id="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Senha de login"
                  className="campo-entrada campo-com-icone"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="botao-alternar-senha"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label="Alternar exibição da senha"
                >
                  <svg
                    className="icone-senha"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>

              {estaNoLogin && (
                <div className="container-esqueci-senha">
                  <a href="#recuperar" className="link-esqueci-senha">
                    Esqueceu a senha?
                  </a>
                </div>
              )}
            </div>

            {!estaNoLogin && (
              <div className="grupo-campo">
                <label className="rotulo-campo" htmlFor="confirmar-senha">
                  Confirmar Senha
                </label>
                <div className="container-input-senha">
                  <input
                    id="confirmar-senha"
                    type={mostrarConfirmarSenha ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    className="campo-entrada campo-com-icone"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="botao-alternar-senha"
                    onClick={() =>
                      setMostrarConfirmarSenha(!mostrarConfirmarSenha)
                    }
                    aria-label="Alternar exibição da confirmação"
                  >
                    <svg
                      className="icone-senha"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <button type="submit" className="botao-principal-acao">
              {estaNoLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          {/* Linha divisora */}
          <div className="linha-divisoria"></div>

          {/* Botões Sociais */}
          <div className="container-botoes-sociais">
            <button type="button" className="botao-social">
              <svg className="icone-social" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue com Google</span>
            </button>

            <button type="button" className="botao-social">
              <img src={iconeApple} alt="Apple" className="icone-social" />
              <span>Continue com Apple</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
