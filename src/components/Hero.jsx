import Radar from './Radar'

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-[#0c0d10] overflow-hidden pt-28 pb-20 lg:pt-32 min-h-screen flex items-center">
      <div className="scanlines" />
      <div className="scan-sweep" />

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#4ADE80 1px, transparent 1px), linear-gradient(90deg, #4ADE80 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid lg:grid-cols-[1fr_0.9fr] gap-14 items-center w-full">
        {/* Text */}
        <div>
          <div className="hud-frame inline-block px-4 py-1.5 mb-6" style={{ '--hud-color': '#4ADE80' }}>
            <span className="hud-corner-tr" />
            <span className="hud-corner-bl" />
            <span className="font-mono text-xs text-[#4ADE80] tracking-widest">
              STATUS: CANDIDATO ATIVO // DEP. ESTADUAL
            </span>
          </div>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] text-white mb-6 tracking-wide">
            MARCOS<br />
            <span className="text-[#B91C1C]">TEIXEIRA</span>
          </h1>

          <p className="font-mono text-[#4ADE80] text-sm mb-4 tracking-wide">
            &gt; SEGURANÇA NÃO SE NEGOCIA_
          </p>

          <p className="text-white/50 leading-relaxed mb-10 max-w-md">
            Ex-policial militar e instrutor de tiro esportivo, Marcos leva 20
            anos de experiência em segurança pública para a Assembleia
            Legislativa, em defesa da legítima defesa e dos CACs.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#cadastro"
              className="bg-[#B91C1C] text-white px-8 py-4 font-bold text-sm hover:bg-[#7F1414] transition-colors duration-200 shadow-md uppercase tracking-wide"
            >
              Quero apoiar
            </a>
            <a
              href="#propostas"
              className="border-2 border-[#4A5568] text-white px-8 py-4 font-bold text-sm hover:bg-white/5 transition-colors duration-200 uppercase tracking-wide"
            >
              Ver dossiê de propostas
            </a>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <div className="h-11 px-3 bg-[#22262E] border border-[#4ADE80]/40 text-[#4ADE80] flex items-center justify-center font-bold text-sm">
              1911
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">
                Código do candidato
              </p>
              <p className="text-sm font-semibold text-white/80">1911 — PDS</p>
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="w-64 sm:w-80 lg:w-96 relative">
            <Radar className="w-full" />
            <div className="absolute -bottom-4 -left-4 hud-frame bg-[#0c0d10]/80 px-3 py-2" style={{ '--hud-color': '#4ADE80' }}>
              <span className="hud-corner-tr" />
              <span className="hud-corner-bl" />
              <p className="font-mono text-[10px] text-[#4ADE80]">RADAR // SEGURANÇA PÚBLICA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
