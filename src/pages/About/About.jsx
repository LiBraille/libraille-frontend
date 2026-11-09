import "./About.css";
import AboutLibraille from "../../components/AboutLibraille/AboutLibraille";
import Navbar from "../../components/navbar/Navbar";

export default function About(){
    return(
        <main className="about-page">
         <AboutLibraille /> 
         <Navbar />
        </main>
    );
}
