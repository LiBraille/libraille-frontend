import './FileStatus.css';

function FileStatus() {
  return (
    <section className="status">
      <h2 className="status__title">Progresso</h2>

      <ol className="status__steps">
        <li className="status__step">
          <span className="status__circle">1</span>
          <h3 className="status__label">Upload do Arquivo</h3>
        </li>

        <li className="status__step">
          <span className="status__circle">2</span>
          <h3 className="status__label">Conversão para Braille</h3>
        </li>

        <li className="status__step">
          <span className="status__circle">3</span>
          <h3 className="status__label">Pronto para Transferir</h3>
        </li>
      </ol>
    </section>
  );
}

export default FileStatus