import { useState } from "react"
import teamMembers from "../../data/teamMembers"
import './teamdescription.css'


function TeamDescription() {
    const [indiceAtual, setIndiceAtual] = useState(0)
    const membroAtivo = teamMembers[indiceAtual]

    function proximoMembro() {
        setIndiceAtual((prevIndice) => (prevIndice + 1) % teamMembers.length) //prevIndice é o índice atual, e usamos o operador módulo para garantir que ele volte ao início quando atingir o final da lista
        if (indiceAtual === teamMembers.length - 1) {
            setIndiceAtual(0)
        }
    }

    function membroAnterior() {
        setIndiceAtual((prevIndice) => (prevIndice - 1 + teamMembers.length) % teamMembers.length)
        if (indiceAtual === 0) {
            setIndiceAtual(teamMembers.length - 1)
        }
    }


    return (
        <section className="team-description">
            <h2>Conheça nossa equipe</h2>
            <section className="active-team-member">
                <img src={membroAtivo.foto} alt={membroAtivo.nome} />
                <div className="member-info">
                <h3>{membroAtivo.nome}</h3>
                <h4>{membroAtivo.cargo}</h4>
                <div className="stack">
                    {membroAtivo.stack.map((tecnologia, index) => (
                        <span key={index}>{tecnologia}</span>
                    ))}
                    </div>
                </div>
                <div className="social-media">
                    <a href={membroAtivo.redesSociais.linkedin} target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path fill="currentColor" fill-rule="evenodd" d="M1 2.838A1.84 1.84 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.84 1.84 0 0 1 21.161 23H2.838A1.84 1.84 0 0 1 1 21.161zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708zm-5.5 10.403h3.208V9.25H4.208zM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0" clip-rule="evenodd" />
                        </svg>

                    </a>
                    <a href={membroAtivo.redesSociais.github} target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                            <path d="M0 0h16v16H0z" fill="none" />
                            <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                        </svg>
                    </a>
                </div>
                <p>{membroAtivo.descricao}</p>
                
                <div className="navigation-buttons">
                    <button onClick={membroAnterior}>Anterior</button>
                    <button onClick={proximoMembro}>Próximo</button>
                </div>
            </section>
            <div className="thumbnails-container">
                {teamMembers.map((membro, index) => (
                    <img
                        key={membro.id}
                        src={membro.foto}
                        alt={membro.nome}
                        onClick={() => setIndiceAtual(index)}
                        className={index === indiceAtual ? "thumbnail active" : "thumbnail"} // Adiciona a classe 'active' ao thumbnail atual
                    />
                ))}
            </div>
        </section>
    );
}

export default TeamDescription