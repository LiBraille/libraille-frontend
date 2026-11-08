import { useState } from "react"
import teamMembers from "../../data/teamMembers"


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
        <div className="team-description">
            <h2>Conheça nossa equipe</h2>
            <section>
                
            </section>
        </div>
    );
}

export default TeamDescription