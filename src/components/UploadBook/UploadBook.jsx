import { useRef, useState } from 'react';
import './uploadbook.css';

function UploadBook() {
  const inputRef = useRef(null);
  const [arquivo, setArquivo] = useState(null);

  function validarArquivo(arquivoEscolhido) {
    if (!arquivoEscolhido) return;

    const nome = arquivoEscolhido.name.toLowerCase();

    if (nome.endsWith('.epub') || nome.endsWith('.txt')) {
      setArquivo(arquivoEscolhido);
    } else {
      alert('Envie apenas arquivos EPUB ou TXT');
    }
  }

  function escolherArquivo(event) {
    validarArquivo(event.target.files[0]);
  }

  function soltarArquivo(event) {
    event.preventDefault();
    validarArquivo(event.dataTransfer.files[0]);
  }

  function arrastarPorCima(event) {
    event.preventDefault();
  }

  return (
    <section className="upload">
      <h1 className="upload__title">Painel de Conversão e Sincronização</h1>
      <p className="upload__text">
        Envie seus arquivos EPUB ou TXT para converter automaticamente e
        sincronizar em todos os seus dispositivos de leitura.
      </p>

      <div
        className="upload__box"
        onClick={() => inputRef.current.click()}
        onDragOver={arrastarPorCima}
        onDrop={soltarArquivo}
      >
        <input
          type="file"
          ref={inputRef}
          onChange={escolherArquivo}
          accept=".epub,.txt"
          hidden
        />
        <h2 className="upload__box-title">Arraste e solte o seu livro aqui</h2>
        <p className="upload__or">ou</p>
        <button type="button" className="upload__button">
          Escolher arquivo
        </button>
        <ul className="upload__formats">
          <li>EPUB</li>
          <li>TXT</li>
        </ul>

        {arquivo && (
          <p className="upload__selected">Selecionado: {arquivo.name}</p>
        )}
      </div>
    </section>
  );
}

export default UploadBook