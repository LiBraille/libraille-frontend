let ctx

// Chame dentro de um clique do usuário (o navegador bloqueia áudio antes disso)
export function prepararSom() {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    ctx ??= new Ctx()
    if (ctx.state === 'suspended') ctx.resume()
}

// Duas notas curtas, subindo
export function tocarConclusao() {
    if (!ctx) return
    const agora = ctx.currentTime
    ;[659.25, 987.77].forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const ganho = ctx.createGain()
        const inicio = agora + i * 0.18

        osc.type = 'sine'
        osc.frequency.value = freq
        ganho.gain.setValueAtTime(0.0001, inicio)
        ganho.gain.exponentialRampToValueAtTime(0.3, inicio + 0.02)
        ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + 0.6)

        osc.connect(ganho).connect(ctx.destination)
        osc.start(inicio)
        osc.stop(inicio + 0.65)
    })
}