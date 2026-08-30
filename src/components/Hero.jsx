import CandidatoAvatar from './CandidatoAvatar'

export default function Hero() {
  return (
    <section id="inicio" className="relative bg-[#16181D] overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Diagonal steel accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full bg-[#22262E] hidden lg:block"
        style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0% 100%)' }}
      />
      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#B91C1C]" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* Text */}
        <div>
          <span className="inline-flex items-center gap-2 border border-[#B91C1C]/50 px-4 py-1.5 text-xs font-bold text-[#B91C1C] uppercase tracking-widest mb-6">
            Candidato a Deputado Estadual
          </span>

          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl leading-[0.95] text-white mb-6 tracking-wide">
            MARCOS<br />
            <span className="text-[#B91C1C]">TEIXEIRA</span>
          </h1>

          <p className="text-xl text-white/60 mb-4 uppercase tracking-wide font-display">Segurança não se negocia.</p>

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
              Conheça as propostas
            </a>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-11 px-3 bg-[#22262E] border border-[#4A5568] text-white flex items-center justify-center font-black text-sm">
              1911
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium">
                Número do candidato
              </p>
              <p className="text-sm font-semibold text-white/80">1911 — PDS</p>
            </div>
          </div>
        </div>

        {/* Avatar */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-64 sm:w-80">
            <div className="absolute inset-0 bg-[#B91C1C]/10 scale-105" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            <div className="relative overflow-hidden shadow-2xl border-4 border-[#4A5568]" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <CandidatoAvatar className="w-full h-auto" />
            </div>
            <div className="absolute -bottom-4 -left-6 bg-[#22262E] border border-[#4A5568] px-5 py-3 shadow-lg">
              <p className="text-xs text-white/40">Partido</p>
              <p className="font-display text-white text-lg tracking-wide">PDS</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
