import { useEffect, useRef, useState } from "react";
import './aboutLibraille.css';

const items = [
    {
        number: "01",
        title: "Inovação",
        description: "Explorar a tecnologia para ampliar possibilidades."
    },
    {
        number: "02",
        title: "Empatia",
        description: "Considerar as necessidades reais das pessoas."
    },
    {
        number: "03",
        title: "Autonomia",
        description: "Valorizar a independência na experiência de leitura."
    },
    {
        number: "04",
        title: "Acessibilidade",
        description: "Pensar na acessibilidade desde o início.",
    },
];

export default function AboutLibraille() {
    const timelineRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let animationFrameId = null;

        const updateProgress = () => {
            if (!timelineRef.current) return;

            const rect = timelineRef.current.getBoundingClientRect();
            const trigger = window.innerHeight * 0.58;
            const start = rect.top + 60;
            const end = rect.bottom - 60;
            const distance = end - start;

            // Proteção contra divisão por zero ou elementos ainda não renderizados
            if (distance <= 0) return;

            const value = Math.max(
                0,
                Math.min(1, (trigger - start) / distance)
            );

            setProgress(value);
        };

        const handleScrollOrResize = () => {
            // Sincroniza a atualização com o ciclo de renderização da tela
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            animationFrameId = requestAnimationFrame(updateProgress);
        };

        updateProgress();

        window.addEventListener("scroll", handleScrollOrResize, { passive: true });
        window.addEventListener("resize", handleScrollOrResize);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <section className="about-timeline-section">
            <div className="about-timeline-container">
                <h2>POR QUE <span>LIBRAILLE?</span></h2>
                <p>
                    Mais do que tecnologia, acreditamos em criar possibilidades,
                    promover independência e tornar a leitura acessível a todos.
                </p>
            </div>

            <div 
                className="timeline"
                ref={timelineRef}
                style={{
                    "--progress": `${progress * 100}%`,
                }}
            >
                <div className="timeline-track">
                    <div className="timeline-fill" />
                </div>

                {items.map((item, index) => {
                    const active = progress >= index / (items.length - 1);

                    return (
                        <article 
                            key={item.number} 
                            className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
                        >
                            <div className={`timeline-dot ${active ? "active" : ""}`} />
                            <div className="timeline-card">
                                <span className="timeline-number">{item.number}</span>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}