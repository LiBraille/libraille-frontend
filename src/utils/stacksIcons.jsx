import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaPython } from 'react-icons/fa'
import { SiCplusplus, SiMysql, SiPostgresql } from 'react-icons/si'

// Recebe o nome da tecnologia (ex.: 'React') e devolve o ícone dela.
// Se não houver ícone, devolve null: o nome já aparece escrito ao lado do ícone.
export function renderizarIconeStack(tecnologia) {
    switch (tecnologia.toLowerCase()) {
        case 'react':
            return <FaReact color="#61DAFB" size={24} />
        case 'javascript':
            return <FaJs color="#F7DF1E" size={24} />
        case 'html':
            return <FaHtml5 color="#E34F26" size={24} />
        case 'css':
            return <FaCss3Alt color="#1572B6" size={24} />
        case 'python':
            return <FaPython color="#3776AB" size={24} />
        case 'mysql':
            return <SiMysql color="#4479A1" size={24} />
        case 'c++':
            return <SiCplusplus color="#00599C" size={24} />
        case 'postgresql':
            return <SiPostgresql color="#336791" size={24} />
        default:
            return null
    }
}