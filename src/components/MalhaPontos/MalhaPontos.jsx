import React, { useRef, useEffect } from 'react';

export default function MalhaPontos({
  cor = '#E5A93C',        // Dourado LiBraille
  raioPonto = 3,          // Tamanho base das bolinhas
  espacamento = 36,       // Espaçamento da grade
  raioAlcance = 140       // Raio de ativação do cursor
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const pai = canvas.parentElement;
    let largura = (canvas.width = pai.offsetWidth);
    let altura = (canvas.height = pai.offsetHeight);

    let mouse = { x: -1000, y: -1000 };
    let ondas = []; // Armazena as ondas geradas pelos cliques

    // Estrutura de cada ponto com física elástica
    let pontos = [];
    const gerarGrade = () => {
      pontos = [];
      for (let x = espacamento / 2; x < largura; x += espacamento) {
        for (let y = espacamento / 2; y < altura; y += espacamento) {
          pontos.push({
            origemX: x,
            origemY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
            opacidade: 0,
            escala: 1
          });
        }
      }
    };
    gerarGrade();

    const redimensionar = () => {
      if (!pai) return;
      largura = canvas.width = pai.offsetWidth;
      altura = canvas.height = pai.offsetHeight;
      gerarGrade();
    };

    const moverMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const sairMouse = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Dispara a onda de choque ao clicar
    const clicar = (e) => {
      const rect = canvas.getBoundingClientRect();
      ondas.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        raio: 0,
        raioMaximo: 280,
        velocidade: 9,
        forca: 1
      });
    };

    window.addEventListener('resize', redimensionar);
    pai.addEventListener('mousemove', moverMouse);
    pai.addEventListener('mouseleave', sairMouse);
    pai.addEventListener('mousedown', clicar);

    // Loop de renderização fluida
    const animar = () => {
      ctx.clearRect(0, 0, largura, altura);

      // 1. Atualiza as ondas de choque
      for (let o = ondas.length - 1; o >= 0; o--) {
        const onda = ondas[o];
        onda.raio += onda.velocidade;
        onda.forca = 1 - onda.raio / onda.raioMaximo;

        if (onda.raio >= onda.raioMaximo) {
          ondas.splice(o, 1);
        }
      }

      // 2. Atualiza e desenha cada bolinha
      for (let i = 0; i < pontos.length; i++) {
        const p = pontos[i];

        // --- Influência do Cursor (Hover) ---
        const dxMouse = mouse.x - p.origemX;
        const dyMouse = mouse.y - p.origemY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        let opacidadeAlvo = 0;
        let escalaAlvo = 1;

        if (distMouse < raioAlcance) {
          const proximidade = 1 - distMouse / raioAlcance;
          opacidadeAlvo = Math.pow(proximidade, 1.4);
          escalaAlvo = 1 + proximidade * 1.3; // Bolinha expande até 2.3x o tamanho base

          // Leve repulsão elástica para longe do mouse
          const angulo = Math.atan2(dyMouse, dxMouse);
          const empurrao = proximidade * 16;
          p.vx -= Math.cos(angulo) * empurrao * 0.18;
          p.vy -= Math.sin(angulo) * empurrao * 0.18;
        }

        // --- Influência das Ondas de Clique ---
        for (let o = 0; o < ondas.length; o++) {
          const onda = ondas[o];
          const dxOnda = p.origemX - onda.x;
          const dyOnda = p.origemY - onda.y;
          const distOnda = Math.sqrt(dxOnda * dxOnda + dyOnda * dyOnda);
          const diferenca = Math.abs(distOnda - onda.raio);

          // Espessura do anel da onda (40px)
          if (diferenca < 40) {
            const intensidade = (1 - diferenca / 40) * onda.forca;
            opacidadeAlvo = Math.max(opacidadeAlvo, intensidade);
            escalaAlvo = Math.max(escalaAlvo, 1 + intensidade * 1.8);

            const anguloOnda = Math.atan2(dyOnda, dxOnda);
            p.vx += Math.cos(anguloOnda) * intensidade * 5;
            p.vy += Math.sin(anguloOnda) * intensidade * 5;
          }
        }

        // --- Física de Mola (Retorno Suave para a Origem) ---
        p.vx += (p.origemX - p.x) * 0.14; // Rigidez
        p.vy += (p.origemY - p.y) * 0.14;
        p.vx *= 0.72; // Amortecimento
        p.vy *= 0.72;
        p.x += p.vx;
        p.y += p.vy;

        // Suavização das transições visuais
        p.opacidade += (opacidadeAlvo - p.opacidade) * 0.15;
        p.escala += (escalaAlvo - p.escala) * 0.18;

        // Desenha apenas o que está minimamente visível
        if (p.opacidade > 0.015) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, raioPonto * p.escala, 0, Math.PI * 2);
          ctx.fillStyle = cor;
          ctx.globalAlpha = p.opacidade;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(animar);
    };

    animar();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', redimensionar);
      pai.removeEventListener('mousemove', moverMouse);
      pai.removeEventListener('mouseleave', sairMouse);
      pai.removeEventListener('mousedown', clicar);
    };
  }, [cor, raioPonto, espacamento, raioAlcance]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}