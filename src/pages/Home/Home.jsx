import ScrambledText from '../../components/ScrambleText/ScrambledText';
import NavBar from '../../components/navbar/Navbar';
import Hero from '../../components/Hero/Hero';
import CallToAction from '../../components/CallToAction/CallToAction';

export default function Home() {
    return (
        <>
            <NavBar />
            <main className="flex min-h-screen items-center justify-center p-24">
                <Hero />
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
            </main>
            <CallToAction/>
        </>
    );
}
