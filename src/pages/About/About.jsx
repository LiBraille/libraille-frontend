import AboutStory from '../../components/AboutStory/AboutStory'
import AboutPurpose from '../../components/AboutPurpose/AboutPurpose'
import AboutValues from '../../components/AboutValues/AboutValues'
import TeamDescription from '../../components/TeamDescription/TeamDescription'
import { usePageTitle } from '../../hooks/usePageTitle'

export default function About() {
    // Título da aba do navegador: "Sobre | LiBraille"
    usePageTitle('Sobre')

    // page-glow (definido no index.css) dá o fundo com os brilhos roxo e dourado
    return (
        <div className="page-glow">
            <AboutStory />
            <AboutPurpose />
            <AboutValues />
            <TeamDescription />
        </div>
    )
}