// Exemplo conceitual do componente BrailleCell.jsx
export function BrailleCell({ byteValue = 0 }) {
  // Testa se cada um dos 6 bits (de 0 a 5) é 1 ou 0
  const pino1 = (byteValue & (1 << 0)) !== 0; // Bit 0
  const pino2 = (byteValue & (1 << 1)) !== 0; // Bit 1
  const pino3 = (byteValue & (1 << 2)) !== 0; // Bit 2
  const pino4 = (byteValue & (1 << 3)) !== 0; // Bit 3
  const pino5 = (byteValue & (1 << 4)) !== 0; // Bit 4
  const pino6 = (byteValue & (1 << 5)) !== 0; // Bit 5

  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-slate-900 rounded-2xl w-48 mx-auto shadow-2xl border border-slate-700">
      {/* Coluna da Esquerda (Pinos 1, 2 e 3) */}
      <div className="flex flex-col gap-4 items-center">
        <Ponto ativo={pino1} numero={1} />
        <Ponto ativo={pino2} numero={2} />
        <Ponto ativo={pino3} numero={3} />
      </div>

      {/* Coluna da Direita (Pinos 4, 5 e 6) */}
      <div className="flex flex-col gap-4 items-center">
        <Ponto ativo={pino4} numero={4} />
        <Ponto ativo={pino5} numero={5} />
        <Ponto ativo={pino6} numero={6} />
      </div>
    </div>
  );
}

// Estilização simples dos círculos com transição suave
function Ponto({ ativo, numero }) {
  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-150 ${
        ativo
          ? "bg-emerald-500 text-slate-950 scale-105 shadow-[0_0_20px_rgba(16,185,129,0.7)]"
          : "bg-slate-800 text-slate-500 border border-slate-700"
      }`}
    >
      {numero}
    </div>
  );
}