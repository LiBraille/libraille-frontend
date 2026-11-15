import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaPython } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { SiMysql, SiPostgresql } from "react-icons/si";

export function renderizarIconeStack(tecnologia) {
    switch (tecnologia.toLowerCase()) {
        case 'react':
            return <FaReact title="React" color="#61DAFB" size={24} />;
        case 'javascript':
            return <FaJs title="JavaScript" color="#F7DF1E" size={24} />;
        case 'html':
            return <FaHtml5 title="HTML5" color="#E34F26" size={24} />;
        case 'css':
            return <FaCss3Alt title="CSS3" color="#1572B6" size={24} />;
        case 'python':
            return <FaPython title="Python" color="#3776AB" size={24} />;
        case 'mysql':
            return <SiMysql title="MySQL" color="#4479A1" size={24} />;
        case 'c++':
            return <SiCplusplus title="C++" color="#00599C" size={24} />;
        case 'postgresql':
            return <SiPostgresql title="PostgreSQL" color="#336791" size={24} />;
        default:
            return <span>{tecnologia}</span>; // Se não encontrar o ícone, exibe o texto normal como fallback
    }
}