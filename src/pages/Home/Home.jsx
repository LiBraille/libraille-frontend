import NavBar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import './home.css';
import DeviceSection from '../../components/DeviceSection/DeviceSection';
import GlueDots from '../../components/GlueDots/GlueDots';
import Faq from '../../components/Faq/Faq';
import CallToAction from '../../components/CallToAction/CallToAction';
import PhotoCircles from '../../components/PhotoCircles/PhotoCircles';
import Footer from '../../components/footer/Footer';

export default function Home() {
    return (
        <>
            <NavBar />
            <main className="container" id="home" aria-label="Página inicial do site">
            <Hero />
            <GlueDots
                className="painel"

                // --- LAYOUT ---
                fill={false}              // Distribui as bolinhas por toda a tela
                columns={10}             // Quantidade de colunas
                rows={3}                // Quantidade de linhas
                inset={20}               // Margem interna para as bolinhas não tocarem a borda
                spacing={50}             // Distância interna entre os pinos da mesma célula
                cellSpacing={50}
                // --- CORES E VISUAL ---
                backgroundColor="none"// Cor do fundo do container
                color="#D9B03F"          // Cor das bolinhas (ex: laranja)
                dotRadius={12}           // Tamanho de cada bolinha

                // --- FÍSICA DO CLIQUE ---
                tension={250}            // Velocidade com que voltam ao lugar
                bounce={20}              // Força do empurrão da onda

                // --- INTERAÇÃO COM O MOUSE  ---
                cursorInteraction={true} // Ativar magnetismo
                cursorRadius={100}       // Área de efeito do cursor
                cursorPull={100}         // Força de atração para o mouse
                cursorSwell={0.6}        // Quanto elas incham perto do mouse (0.6 = 60% maiores)
            />
            <DeviceSection />
            <Faq />
            <CallToAction />
            <PhotoCircles />
            </main>
            <Footer />
        </>
    );
}
