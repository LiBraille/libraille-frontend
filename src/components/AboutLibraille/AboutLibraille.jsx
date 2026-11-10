import {useEffect, useRef, useState} from "react";
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
    const [progress, setProgress] =
    useState(0);

    useEffect(() => {
        const updateProgress = () => {
            if (!timelineRef.current) return;

            const rect = timelineRef.current.getBoundingClientRect();
            const trigger = window.innerHeight * 0.58;
            const start = rect.top + 60;
            const end = rect.bottom - 60;

            const value = Math.max(
                0,
                Math.min(1, (trigger - start) / (end - start))
            );

            setProgress(value);
        };

        updateProgress();
        window.addEventListener("scroll", updateProgress, {
            passive: true,
        });

        window.addEventListener("resize", updateProgress);

        return () => {
            window.removeEventListener("scroll", updateProgress);
            window.removeEventListener("resize", updateProgress);
        };
    }, []);

    return (
        <section className="about-libraille">
            <div className="about-container">

                <h2>POR QUE <span>LIBRAILLE?</span></h2>
                <p>Mais do que tecnologia,
                    acreditamos em criar possibilidades,
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
                        <article key={item.number} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>

                        <div className={`timeline-dot ${ active ? "active" : " " }`}/>
                        <div className="timeline-card">

                            <span className="timeline-number">{item.number}</span>

                            <h3>{item.title}</h3>

                            <p>{item.description}</p>
                            <div className="card-decoration" />
                        </div>
                    </article>
                );
            })}
            
            </div>
        </section>
    );
  
}
