import AboutPurpose from '../../components/AboutPurpose/AboutPurpose'
import AboutStory from '../../components/AboutStory/AboutStory'
import AboutValues from '../../components/AboutValues/AboutValues'
import TeamDescription from '../../components/TeamDescription/TeamDescription'
import './About.css'

export default function About() {
    return (
        <div className="page-glow">
            <AboutStory />
            <AboutPurpose />
            <AboutValues />
            <TeamDescription />
        </div>
    )
}