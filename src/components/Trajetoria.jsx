const eventos = [
  {
    ano: '2005',
    titulo: 'Ingresso na PM',
    texto: 'Aos 19 anos, Marcos ingressa na Polícia Militar e serve em unidades de patrulhamento.',
  },
  {
    ano: '2012',
    titulo: 'Instrutor de tiro',
    texto: 'Certifica-se como instrutor de tiro esportivo e passa a formar atiradores e caçadores.',
  },
  {
    ano: '2019',
    titulo: 'Fundação da associação de CACs',
    texto: 'Cria uma associação de apoio a colecionadores, atiradores e caçadores da região.',
  },
  {
    ano: '2023',
    titulo: 'Reserva e consultoria',
    texto: 'Passa para a reserva da PM e atua como consultor de segurança para comércios e condomínios.',
  },
  {
    ano: '2026',
    titulo: 'Candidatura a deputado estadual',
    texto: 'Concorre a uma vaga na Assembleia Legislativa, pelo número 1911.',
  },
]

export default function Trajetoria() {
  return (
    <section id="trajetoria" className="py-20 lg:py-28 bg-[#0F1115]">
      <div className="max-w-3xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
            <span className="text-[#B91C1C] text-xs font-bold uppercase tracking-widest">
              Linha do tempo
            </span>
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-white tracking-wide">
            Trajetória
          </h2>
        </div>

        <ol className="relative border-l-2 border-[#4A5568]/40 ml-3">
          {eventos.map((e) => (
            <li key={e.ano} className="mb-10 ml-8 last:mb-0">
              <span className="absolute -left-[9px] w-4 h-4 bg-[#B91C1C] border-4 border-[#0F1115]" />
              <span className="inline-block bg-[#22262E] border border-[#4A5568]/40 text-white text-xs font-black px-2.5 py-1 mb-2">
                {e.ano}
              </span>
              <h3 className="font-display text-2xl text-white tracking-wide">{e.titulo}</h3>
              <p className="text-white/50 text-sm leading-relaxed mt-1">{e.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
