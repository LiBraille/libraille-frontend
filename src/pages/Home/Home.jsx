import NavBar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import './home.css';

export default function Home({ onIrParaLogin }) {
    return (
        <>
            <NavBar onIrParaLogin={onIrParaLogin} />
            <Hero />
        
        </>
    );
}
