import { useRef, useState } from 'react'
import './uploadbook.css'

function UploadBook({ onArquivo, ocupado, erro }) {
  const inputRef = useRef(null)
  const [arrastando, setArrastando] = useState(false)   // true enquanto há um arquivo sobre a caixa

  const escolher = (e) => {
    onArquivo(e.target.files[0])
    e.target.value = ''   // permite escolher o mesmo arquivo de novo
  }

  const aoArrastar = (e) => {
    e.preventDefault()    // sem isso, o navegador não deixa soltar o arquivo aqui
    if (!ocupado) setArrastando(true)
  }

  const soltar = (e) => {
    e.preventDefault()
    setArrastando(false)
    if (!ocupado) onArquivo(e.dataTransfer.files[0])
  }

  return (
    <section className="upload" aria-labelledby="upload-titulo">
      <h1 id="upload-titulo" className="upload__title">Conversor de livros</h1>
      <p className="upload__text">
        Envie um arquivo EPUB ou TXT para converter em braille e transferir para o seu dispositivo.
      </p>

      {/* data-surface="dark": caixa sempre escura, nos dois temas (como o footer e a doação) */}
      <div
        className={`upload__box ${arrastando ? 'is-drag' : ''}`}
        data-surface="dark"
        onDragOver={aoArrastar}
        onDragLeave={() => setArrastando(false)}
        onDrop={soltar}
      >
        {/* O input fica escondido; o botão abaixo é quem abre a escolha de arquivo (funciona com teclado) */}
        <input
          ref={inputRef}
          type="file"
          accept=".epub,.txt"
          onChange={escolher}
          hidden
          tabIndex={-1}
        />

        {/* <p> e não <h2>: é uma instrução, não um título de seção */}
        <p className="upload__box-title">Arraste e solte o seu livro aqui</p>
        <p className="upload__or">ou</p>

        <button
          type="button"
          className="btn btn--primary upload__button"
          disabled={ocupado}
          onClick={() => inputRef.current.click()}
        >
          {ocupado ? 'Convertendo…' : 'Escolher arquivo'}
        </button>

        <ul className="upload__formats" aria-label="Formatos aceitos">
          <li>EPUB</li>
          <li>TXT</li>
        </ul>

        <p className="upload__privacy">
          O site não salva o seu livro no navegador: a lista some ao recarregar a página.
        </p>
      </div>

      {erro && <p className="upload__error" role="alert">{erro}</p>}
    </section>
  )
}

export default UploadBook