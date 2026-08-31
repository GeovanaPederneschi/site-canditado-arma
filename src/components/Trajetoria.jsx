const eventos = [
  { ano: '2005', titulo: 'Ingresso na PM', texto: 'Aos 19 anos, Marcos ingressa na Polícia Militar e serve em unidades de patrulhamento.' },
  { ano: '2012', titulo: 'Instrutor de tiro', texto: 'Certifica-se como instrutor de tiro esportivo e passa a formar atiradores e caçadores.' },
  { ano: '2019', titulo: 'Fundação da associação de CACs', texto: 'Cria uma associação de apoio a colecionadores, atiradores e caçadores da região.' },
  { ano: '2023', titulo: 'Reserva e consultoria', texto: 'Passa para a reserva da PM e atua como consultor de segurança para comércios e condomínios.' },
  { ano: '2026', titulo: 'Candidatura a deputado estadual', texto: 'Concorre a uma vaga na Assembleia Legislativa, pelo número 1911.' },
]

export default function Trajetoria() {
  return (
    <section id="trajetoria" className="relative py-20 lg:py-28 bg-[#0c0d10] overflow-hidden">
      <div className="scanlines" />

      <div className="relative max-w-3xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-12">
          <span className="font-mono text-[#4ADE80] text-xs uppercase tracking-widest">Log de missão // Trajetória</span>
          <h2 className="font-display text-5xl sm:text-6xl text-white mt-2 tracking-wide">
            Trajetória
          </h2>
        </div>

        <div className="hud-frame bg-[#16181D] border border-[#4A5568]/30 p-6 sm:p-8 font-mono text-sm" style={{ '--hud-color': '#4ADE80' }}>
          <span className="hud-corner-tr" />
          <span className="hud-corner-bl" />
          <div className="flex items-center gap-2 mb-6 text-white/40 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80]/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#4A5568]" />
            <span className="ml-2">log_marcos_teixeira.txt</span>
          </div>

          <div className="flex flex-col gap-5">
            {eventos.map((e) => (
              <div key={e.ano} className="border-l-2 border-[#4ADE80]/40 pl-4">
                <p className="text-[#4ADE80]">
                  [{e.ano}] <span className="text-white">{e.titulo}</span>
                </p>
                <p className="text-white/45 mt-1 leading-relaxed">{'// ' + e.texto}</p>
              </div>
            ))}
            <p className="text-[#4ADE80] flex items-center gap-1">
              [2026] <span className="text-white">status: campanha em andamento</span>
              <span className="inline-block w-2 h-4 bg-[#4ADE80] animate-pulse ml-1" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
