const stats = [
  { value: '20', label: 'anos de carreira na Polícia Militar' },
  { value: '2.500+', label: 'atiradores e caçadores formados' },
  { value: '14', label: 'municípios com núcleo de apoio' },
  { value: '1911', label: 'número na urna, pelo PDS' },
]

const tags = ['Legítima defesa', 'Direitos dos CACs', 'Segurança pública', 'Valorização policial']

export default function QuemE() {
  return (
    <section id="quem-e" className="relative py-20 lg:py-28 bg-[#0F1115] overflow-hidden">
      <div className="scanlines" />
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-0.5 bg-[#B91C1C]" />
          <span className="font-mono text-[#4ADE80] text-xs uppercase tracking-widest">
            Ficha // Conheça o candidato
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-display text-5xl sm:text-6xl text-white leading-tight mb-8 tracking-wide">
              Quem é<br />
              <span className="text-[#B91C1C]">Marcos Teixeira</span>
            </h2>

            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                Filho de policial, Marcos ingressou na Polícia Militar aos 19
                anos e serviu por duas décadas em unidades de patrulhamento e
                treinamento tático. Tornou-se instrutor de tiro esportivo
                certificado e passou a formar centenas de atiradores,
                colecionadores e caçadores (CACs) em segurança no manejo de
                armas.
              </p>
              <p>
                Após a reserva, fundou uma associação de apoio a CACs e passou
                a atuar como consultor de segurança para comércios e
                condomínios, sempre defendendo o direito à legítima defesa e
                o fortalecimento das forças policiais.
              </p>
              <p>
                Agora, Marcos leva essa experiência para a Assembleia
                Legislativa:{' '}
                <strong className="text-white">
                  candidato a deputado estadual pelo PDS, número 1911
                </strong>
                , com uma agenda voltada à segurança pública e à defesa do
                cidadão de bem.
              </p>
            </div>

            <div className="mt-8 flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/5 border border-[#4A5568]/40 text-white/70 text-xs font-semibold px-3.5 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hud-frame bg-[#22262E] border border-[#4A5568]/30 p-2" style={{ '--hud-color': '#4ADE80' }}>
            <span className="hud-corner-tr" />
            <span className="hud-corner-bl" />
            <div className="flex items-center gap-2 px-4 py-2 border-b border-[#4A5568]/30 font-mono text-[10px] text-[#4ADE80]/70 uppercase tracking-widest">
              Ficha 001 — Marcos Teixeira
            </div>
            <div className="grid grid-cols-2 gap-3 p-3">
              <div className="col-span-2 bg-[#16181D] p-6">
                <p className="font-display text-white text-xl leading-relaxed tracking-wide">
                  "QUEM RESPEITA A LEI TEM DIREITO DE SE DEFENDER. ESSA É A PAUTA
                  QUE VOU LEVAR PRA ASSEMBLEIA."
                </p>
                <p className="text-white/40 text-sm mt-4">— Marcos Teixeira</p>
              </div>
              {stats.map((s) => (
                <div key={s.label} className="bg-[#16181D] p-6 hover:bg-[#1a1e26] transition-colors">
                  <p className="font-display text-4xl text-[#B91C1C] leading-none tracking-wide">
                    {s.value}
                  </p>
                  <p className="text-white/50 text-xs mt-2 leading-tight font-mono">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
