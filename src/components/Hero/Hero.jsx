import Button from "../button/Button"
import ScrambledText from '../../components/ScrambleText/ScrambledText';
import './hero.css';
import GlueDots from "../GlueDots/GlueDots";

function Hero(){
    return(
        <>
        <GlueDots 
        className="painel" 
        
        // --- LAYOUT ---
        fill={false}              // Distribui as bolinhas por toda a tela
        columns={10}             // Quantidade de colunas
        rows={3}                // Quantidade de linhas
        inset={20}               // Margem interna para as bolinhas não tocarem a borda
        spacing={40}             // Distância interna entre os pinos da mesma célula
        cellSpacing={50}
        // --- CORES E VISUAL ---
        backgroundColor="none"// Cor do fundo do container
        color="#5d928d"          // Cor das bolinhas (ex: laranja)
        dotRadius={12}           // Tamanho de cada bolinha
        
        // --- FÍSICA DO CLIQUE ---
        tension={250}            // Velocidade com que voltam ao lugar
        bounce={20}              // Força do empurrão da onda
        
        // --- INTERAÇÃO COM O MOUSE  ---
        cursorInteraction={true} // Ativar magnetismo
        cursorRadius={180}       // Área de efeito do cursor
        cursorPull={100}         // Força de atração para o mouse
        cursorSwell={0.6}        // Quanto elas incham perto do mouse (0.6 = 60% maiores)
      />
           <section className="flex min-h-screen items-center justify-center p-24 hero-section">
                <div className='hero-texts'>
                <ScrambledText
                    className="scrambled-text-demo hero-title"
                    effect="scramble"
                    radius={100}
                    strength={1}
                    trail={0.6}
                    duration={1.2}
                    speed={0.5}
                    scrambleChars=".:"
                    clickBurst
                    intro
                >
                    Histórias que ganham relevo

                </ScrambledText>
                <ScrambledText
                    className="scrambled-text-demo hero-paragraph"
                    effect="scramble"
                    radius={100}
                    strength={1}
                    trail={0.6}
                    duration={1.2}
                    speed={0.5}
                    scrambleChars=".:"
                    clickBurst
                    intro
                >
                    Transforme livros em experiências de leitura tátil com o LiBraille
                </ScrambledText>
                </div>
                <Button id="hero-button" aria-label="Botão para conhecer sobre o produto e equipe LiBraille">
                    <a href="">Saiba mais</a>
                </Button>
            </section>
            
        </>
    )
}

export default Hero

