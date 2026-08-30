const propostas = [
  {
    titulo: 'Legítima defesa',
    texto: 'Apoio a projetos que garantam ao cidadão de bem o direito de se defender dentro da lei.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4z" />
      </svg>
    ),
  },
  {
    titulo: 'Direitos dos CACs',
    texto: 'Menos burocracia e mais respaldo legal para colecionadores, atiradores e caçadores cadastrados.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    titulo: 'Valorização policial',
    texto: 'Melhores salários, equipamentos e condições de trabalho para as forças de segurança.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-4.13a4 4 0 11-4-4 4 4 0 014 4zm6 0a4 4 0 11-4-4" />
      </svg>
    ),
  },
  {
    titulo: 'Combate ao crime organizado',
    texto: 'Investimento em inteligência policial e tecnologia para desarticular facções criminosas.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    titulo: 'Câmeras e monitoramento',
    texto: 'Expansão da videomonitoramento urbano para reduzir crimes e agilizar investigações.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.45a1 1 0 011.45.9v7.1a1 1 0 01-1.45.9L15 14M4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    titulo: 'Apoio a vítimas',
    texto: 'Rede de atendimento psicológico e jurídico gratuito para vítimas de violência.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m-3.536-9.192a4 4 0 010 5.656M9 12a3 3 0 100-6 3 3 0 000 6zm0 0c-3.314 0-6 1.79-6 4v2h12v-2c0-2.21-2.686-4-6-4z" />
      </svg>
    ),
  },
]

export default function Propostas() {
  return (
    <section id="propostas" className="py-20 lg:py-28 bg-[#16181D]">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
            <span className="text-[#B91C1C] text-xs font-bold uppercase tracking-widest">
              Bandeiras da campanha
            </span>
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-5 tracking-wide">
            Propostas
          </h2>
          <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
            Os pilares que guiam a atuação de Marcos Teixeira pela segurança pública.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {propostas.map((p) => (
            <div
              key={p.titulo}
              className="bg-[#22262E] border border-[#4A5568]/25 p-7 hover:border-[#B91C1C]/50 transition-colors"
            >
              <div className="w-12 h-12 bg-[#B91C1C]/15 text-[#B91C1C] flex items-center justify-center mb-5">
                {p.icon}
              </div>
              <h3 className="font-display text-2xl text-white mb-2 tracking-wide">{p.titulo}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
