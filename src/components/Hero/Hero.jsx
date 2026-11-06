import Button from "../button/Button"
import ScrambledText from '../../components/ScrambleText/ScrambledText';
import './hero.css';

function Hero() {
    return (
        <>
        <div className="hero-background">
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
            

            </div>
        </>
    )
}

export default Hero

