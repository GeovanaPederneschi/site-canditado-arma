import { useState } from 'react'

const propostas = [
  { titulo: 'Legítima defesa', texto: 'Apoio a projetos que garantam ao cidadão de bem o direito de se defender dentro da lei.' },
  { titulo: 'Direitos dos CACs', texto: 'Menos burocracia e mais respaldo legal para colecionadores, atiradores e caçadores cadastrados.' },
  { titulo: 'Valorização policial', texto: 'Melhores salários, equipamentos e condições de trabalho para as forças de segurança.' },
  { titulo: 'Combate ao crime organizado', texto: 'Investimento em inteligência policial e tecnologia para desarticular facções criminosas.' },
  { titulo: 'Câmeras e monitoramento', texto: 'Expansão da videomonitoramento urbano para reduzir crimes e agilizar investigações.' },
  { titulo: 'Apoio a vítimas', texto: 'Rede de atendimento psicológico e jurídico gratuito para vítimas de violência.' },
]

function DossierRow({ index, titulo, texto }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <button
      type="button"
      onClick={() => setRevealed((v) => !v)}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      className="hud-frame group w-full text-left bg-[#16181D] border-y border-[#4A5568]/25 hover:border-[#4ADE80]/40 transition-colors px-6 sm:px-8 py-6 flex items-start gap-6"
      style={{ '--hud-color': '#4ADE80' }}
    >
      <span className="hud-corner-tr opacity-0 group-hover:opacity-70 transition-opacity" />
      <span className="hud-corner-bl opacity-0 group-hover:opacity-70 transition-opacity" />

      <span className="font-mono text-3xl sm:text-4xl text-[#4A5568] group-hover:text-[#4ADE80] transition-colors shrink-0">
        {String(index).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-2xl text-white tracking-wide mb-1">{titulo}</h3>
        <div className="relative inline-block max-w-xl">
          <p className={`text-white/55 text-sm leading-relaxed transition-opacity duration-300 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
            {texto}
          </p>
          <span
            className={`absolute inset-0 bg-[#4A5568]/60 origin-left transition-transform duration-500 ${
              revealed ? 'scale-x-0' : 'scale-x-100'
            }`}
            aria-hidden="true"
          />
        </div>
      </div>

      <span className="hidden sm:block font-mono text-[10px] text-[#4ADE80]/60 uppercase tracking-widest shrink-0 mt-2">
        {revealed ? 'Desclassificado' : 'Toque p/ ler'}
      </span>
    </button>
  )
}

export default function Propostas() {
  return (
    <section id="propostas" className="relative py-20 lg:py-28 bg-[#0c0d10] overflow-hidden">
      <div className="scanlines" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-12">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
            <span className="font-mono text-[#4ADE80] text-xs uppercase tracking-widest">Dossiê // Propostas</span>
            <span className="w-8 h-0.5 bg-[#B91C1C]" />
          </div>
          <h2 className="font-display text-5xl sm:text-6xl text-white mb-5 tracking-wide">
            Propostas
          </h2>
          <p className="text-white/45 max-w-lg mx-auto leading-relaxed">
            Toque em cada item do dossiê para desclassificar o conteúdo.
          </p>
        </div>

        <div className="border border-[#4A5568]/25">
          {propostas.map((p, i) => (
            <DossierRow key={p.titulo} index={i + 1} titulo={p.titulo} texto={p.texto} />
          ))}
        </div>
      </div>
    </section>
  )
}
