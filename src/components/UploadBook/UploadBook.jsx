import { useRef, useState } from 'react'
import './uploadbook.css'

function UploadBook({ onArquivo, ocupado, erro }) {
  const inputRef = useRef(null)
  const [arrastando, setArrastando] = useState(false)

  const escolher = (e) => {
    onArquivo(e.target.files[0])
    e.target.value = ''   // permite escolher o mesmo arquivo de novo
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

      <div
        className={`upload__box ${arrastando ? 'is-drag' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setArrastando(true) }}
        onDragLeave={() => setArrastando(false)}
        onDrop={soltar}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".epub,.txt"
          onChange={escolher}
          hidden
          tabIndex={-1}
        />
        <h2 className="upload__box-title">Arraste e solte o seu livro aqui</h2>
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
          Não guardamos o seu livro: ele é usado só para a conversão.
        </p>
      </div>

      {erro && <p className="upload__error" role="alert">{erro}</p>}
    </section>
  )
}

export default UploadBook