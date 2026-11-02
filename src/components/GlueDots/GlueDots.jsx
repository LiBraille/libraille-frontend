import { useEffect, useId, useRef } from "react";
import "./gluedots.css";

/**
 * GlueDots — v3
 *
 * Novidades desta versão:
 *  - Interação com o cursor: pontos são atraídos e aumentam de tamanho perto do mouse.
 *  - Props: cursorInteraction, cursorRadius, cursorPull, cursorSwell.
 */
export default function GlueDots({
  columns = 14,
  rows = 9,
  fill = true,
  spacing = 56,
  cellSpacing = 40,
  inset = 0,
  dotRadius = 12,
  blur = 8,
  contrast = 28,
  merge = true,
  color = "#ffffff",
  backgroundColor = "#0a0a0a",
  opacity = 1,
  paused = false,
  dpr = 2,
  className = "",
  // Física e Ripple (v2)
  tension = 300,
  damping = 15,
  rippleOnPress = true,
  bounce = 35,
  travelDelay = 2.5,
  spread = 60,
  decay = 1500,
  frequency = 2,
  // --- Novas props da v3 (Cursor) ---
  cursorInteraction = true, // Ativa/desativa interação com o mouse
  cursorRadius = 150,       // Distância em que o mouse afeta os pontos
  cursorPull = 200,         // Força com que o mouse puxa os pontos
  cursorSwell = 0.5,        // O quanto os pontos crescem (0.5 = 50% maiores)
  children,
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);

  const filterId = "glue-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const live = useRef({
    dotRadius, color, paused, tension, damping, rippleOnPress, bounce,
    travelDelay, spread, decay, frequency, cursorInteraction, cursorRadius, cursorPull, cursorSwell
  });
  
  const ripples = useRef([]);
  // Guarda a posição do mouse. Começa fora da tela (-1)
  const mouse = useRef({ x: -1, y: -1 });

  useEffect(() => {
    live.current = {
      dotRadius, color, paused, tension, damping, rippleOnPress, bounce,
      travelDelay, spread, decay, frequency, cursorInteraction, cursorRadius, cursorPull, cursorSwell
    };
  }, [dotRadius, color, paused, tension, damping, rippleOnPress, bounce, travelDelay, spread, decay, frequency, cursorInteraction, cursorRadius, cursorPull, cursorSwell]);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = 0;
    let h = 0;
    let pxr = 1;
    let raf = 0;
    let dots = [];
    let lastTime = performance.now();

    const layout = () => {
      let x0, y0, dx, dy;
      if (fill) {
        const iw = Math.max(0, w - inset * 2);
        const ih = Math.max(0, h - inset * 2);
        dx = iw / columns;
        dy = ih / rows;
        x0 = inset + dx / 2;
        y0 = inset + dy / 2;
      } else {
        dx = spacing;
        dy = spacing;
        x0 = (w - (columns - 1) * spacing) / 2;
        y0 = (h - (rows - 1) * spacing) / 2;
      }

      dots = [];
dots = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          
          // A cada 2 colunas (0-1, 2-3, 4-5), adicionamos o espaçamento extra da célula
          const extraSpace = Math.floor(col / 2) * cellSpacing;
          
          const hx = x0 + col * dx + extraSpace;
          const hy = y0 + row * dy;
          
          dots.push({ col, row, hx, hy, x: hx, y: hy, vx: 0, vy: 0, s: 1 });
        }
      }
    };

    const draw = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const { 
        dotRadius: r, color: c, paused, tension, damping, bounce, travelDelay, 
        spread, decay, cursorInteraction, cursorRadius, cursorPull, cursorSwell 
      } = live.current;

      if (!paused) {
        ripples.current = ripples.current.filter(rip => time - rip.time < decay);

        for (const d of dots) {
          // 1. Força de repouso (voltar para o lugar original)
          let fx = (d.hx - d.x) * tension;
          let fy = (d.hy - d.y) * tension;
          let targetScale = 1;

          // 2. Força do Cursor (Puxar e Inchar)
          if (cursorInteraction && mouse.current.x > -1) {
            const mdx = mouse.current.x - d.hx;
            const mdy = mouse.current.y - d.hy;
            const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
            
            if (mdist < cursorRadius) {
              const pullFactor = 1 - mdist / cursorRadius;
              fx += mdx * pullFactor * cursorPull;
              fy += mdy * pullFactor * cursorPull;
              targetScale = 1 + pullFactor * cursorSwell;
            }
          }

          // Animar suavemente a escala do ponto
          d.s += (targetScale - d.s) * 10 * dt;

          // 3. Força do Clique (Ripple)
          for (const rip of ripples.current) {
            const dx = d.hx - rip.x;
            const dy = d.hy - rip.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const timeSinceClick = time - rip.time;
            const waveRadius = timeSinceClick / travelDelay;
            const waveDist = Math.abs(dist - waveRadius);

            if (waveDist < spread) {
              const force = Math.cos((waveDist / spread) * (Math.PI / 2));
              const dirX = dist > 0 ? dx / dist : 0;
              const dirY = dist > 0 ? dy / dist : 0;
              
              fx += dirX * force * bounce * 1000;
              fy += dirY * force * bounce * 1000;
            }
          }

          // Aplicar física
          d.vx += fx * dt;
          d.vy += fy * dt;
          d.vx *= Math.max(0, 1 - damping * dt);
          d.vy *= Math.max(0, 1 - damping * dt);

          d.x += d.vx * dt;
          d.y += d.vy * dt;
        }
      }

      ctx.setTransform(pxr, 0, 0, pxr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = c;

      ctx.beginPath();
      for (const d of dots) {
        const rr = r * d.s;
        ctx.moveTo(d.x + rr, d.y);
        ctx.arc(d.x, d.y, rr, 0, Math.PI * 2);
      }
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };

    const resize = () => {
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      pxr = Math.min(window.devicePixelRatio || 1, dpr);

      canvas.width = Math.max(1, Math.round(w * pxr));
      canvas.height = Math.max(1, Math.round(h * pxr));

      layout();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();
    lastTime = performance.now();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [columns, rows, fill, spacing, inset, dpr]);

  const handlePointerDown = (e) => {
    if (!live.current.rippleOnPress) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    ripples.current.push({ 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top, 
      time: performance.now() 
    });
  };

  const handlePointerMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerLeave = () => {
    mouse.current = { x: -1, y: -1 };
  };

  return (
    <div ref={wrapRef} className={className} style={{ position: "relative", overflow: "hidden", backgroundColor }}>
      <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
            <feColorMatrix type="matrix" values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${contrast} ${-contrast / 2}`} />
          </filter>
        </defs>
      </svg>

      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "80%",
          height: "80%",
          opacity,
          cursor: rippleOnPress || cursorInteraction ? "pointer" : "default"
        }}
      />
      <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%", pointerEvents: "none" }}>
        {children}
      </div>
    </div>
  );
}