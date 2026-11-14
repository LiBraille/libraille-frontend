
import TeamDescription from "../../components/TeamDescription/TeamDescription";
import "./About.css";
import AboutLibraille from "../../components/AboutLibraille/AboutLibraille";
import AboutPillars from "../../components/AboutPillars/AboutPillars";
import AboutStory from "../../components/AboutStory/AboutStory";
import Footer from "../../components/Footer/Footer";

export default function About() {
    return (
        <>
            <AboutStory />
            <AboutPillars />
            <AboutLibraille />
            <TeamDescription />
            <Footer />
        </>
    );
}
