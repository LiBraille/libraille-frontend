<<<<<<< HEAD
import AboutStory from "../../components/AboutStory/AboutStory";
import AboutPillars from "../../components/AboutPillars/AboutPillars";

function About(){
    return(
        <>
        <h1>teste</h1>
        <AboutStory />
        <AboutPillars />
        </>
=======
import TeamDescription from "../../components/TeamDescription/TeamDescription"
import "./About.css";
import AboutLibraille from "../../components/AboutLibraille/AboutLibraille"
import AboutPillars from "../../components/AboutPillars/AboutPillars";
import AboutStory from "../../components/AboutStory/AboutStory";
import Footer from "../../components/Footer/Footer";

export default function About(){
    return(
        <>
        <AboutStory />
        <AboutPillars />
         <AboutLibraille /> 
         <TeamDescription />
         <Footer />
         </>
>>>>>>> fc268e428735450090d53b700244be862d96ebf4
    )
}