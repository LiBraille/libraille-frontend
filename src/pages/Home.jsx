import ScrambledText from '../components/ScrambleText/ScrambledText';
import NavBar from '../components/navbar/Navbar';
import Hero from '../components/Hero/Hero';

export default function Home() {
    return (
        <>
            <NavBar />
            <main className="flex min-h-screen items-center justify-center p-24">
                <Hero />
                <ScrambledText
                    className="scrambled-text-demo"
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
            </main>
        </>
    );
}
