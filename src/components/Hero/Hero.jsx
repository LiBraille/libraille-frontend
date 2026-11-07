import Button from "../button/Button"
import ScrambledText from '../../components/ScrambleText/ScrambledText';
// import './hero.css';

// function Hero() {
//     return (
//         <>
//         <div className="hero-background">
//             <section className="flex min-h-screen items-center justify-center p-24 hero-section">
//                 <div className='hero-texts'>
//                     <ScrambledText
//                         className="scrambled-text-demo hero-title"
//                         effect="scramble"
//                         radius={100}
//                         strength={1}
//                         trail={0.6}
//                         duration={1.2}
//                         speed={0.5}
//                         scrambleChars=".:"
//                         clickBurst
//                         intro
//                     >
//                         Histórias que ganham relevo

//                     </ScrambledText>
//                     <ScrambledText
//                         className="scrambled-text-demo hero-paragraph"
//                         effect="scramble"
//                         radius={100}
//                         strength={1}
//                         trail={0.6}
//                         duration={1.2}
//                         speed={0.5}
//                         scrambleChars=".:"
//                         clickBurst
//                         intro
//                     >
//                         Transforme livros em experiências de leitura tátil com o LiBraille
//                     </ScrambledText>
//                 </div>
//                 <Button id="hero-button" aria-label="Botão para conhecer sobre o produto e equipe LiBraille">
//                     <a href="">Saiba mais</a>
//                 </Button>
//             </section>
            

//             </div>
//         </>
//     )
// }

// export default Hero

// Ajuste o caminho da importação de acordo com a sua estrutura de pastas

import React, { useEffect, useRef } from 'react';

export default function HeroWithGlueDots() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Ajusta o tamanho do canvas ao redimensionar a janela
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Posição do mouse
    const mouse = { x: width / 2, y: height / 2 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Criar vários pontos (dots)
    const numDots = 25;
    const dots = Array.from({ length: numDots }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 12 + 16,
    }));

    // Adiciona o ponto do mouse
    const mouseDot = { x: mouse.x, y: mouse.y, radius: 35 };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Suaviza a atração do mouse
      mouseDot.x += (mouse.x - mouseDot.x) * 0.1;
      mouseDot.y += (mouse.y - mouseDot.y) * 0.1;

      // Desenha o ponto do cursor
      ctx.beginPath();
      ctx.arc(mouseDot.x, mouseDot.y, mouseDot.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6'; // Cor dos pontos (ex: azul/primary)
      ctx.fill();

      // Atualiza e desenha os pontos flutuantes
      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Rebater nas bordas
        if (dot.x < dot.radius || dot.x > width - dot.radius) dot.vx *= -1;
        if (dot.y < dot.radius || dot.y > height - dot.radius) dot.vy *= -1;

        // Leve atração ao mouse se estiver perto
        const dx = mouseDot.x - dot.x;
        const dy = mouseDot.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          dot.x += dx * 0.01;
          dot.y += dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section style={styles.section}>
      {/* Filtro SVG oculto responsável pelo efeito "viscoso/glue" */}
      <svg style={{ display: 'none' }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Canvas com a aplicação do filtro "goo" */}
      <div style={styles.canvasContainer}>
        <canvas ref={canvasRef} style={styles.canvas} />
      </div>

      {/* Conteúdo da Hero */}
      <div className="hero-background">
//             <section className="flex min-h-screen items-center justify-center p-24 hero-section">
//                 <div className='hero-texts'>
//                     <ScrambledText
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
    </section>
  );
}

// Estilos em Objeto JS (dispensa Tailwind ou CSS externo)
const styles = {
  section: {
    position: 'relative',
    minHeight: '80vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f172a',
    overflow: 'hidden',
    fontFamily: 'system-ui, sans-serif',
    color: '#ffffff',
  },
  canvasContainer: {
    position: 'absolute',
    inset: 0,
    filter: 'url(#goo)', // Aplica o efeito pegajoso nos elementos do canvas
    opacity: 0.7,
  },
  canvas: {
    width: '100%',
    height: '100%',
    display: 'block',
  },
  content: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '700px',
    textAlign: 'center',
    padding: '0 20px',
  },
  badge: {
    background: 'rgba(59, 130, 246, 0.2)',
    color: '#60a5fa',
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
  },
  title: {
    fontSize: '3rem',
    fontWeight: '800',
    marginTop: '20px',
    marginBottom: '16px',
    lineHeight: '1.2',
  },
  description: {
    fontSize: '1.125rem',
    color: '#94a3b8',
    marginBottom: '32px',
  },
  primaryBtn: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '12px 28px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
};