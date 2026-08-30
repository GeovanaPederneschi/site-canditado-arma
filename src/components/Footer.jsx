export default function Footer() {
  return (
    <footer className="bg-[#0F1115] border-t border-[#4A5568]/20 py-10 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#B91C1C] flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <span className="text-white font-bold text-xs font-display">MT</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-display text-base tracking-wide">Marcos Teixeira</span>
            <span className="text-[#B91C1C] text-[10px] uppercase tracking-widest font-medium">
              Deputado Estadual · 1911
            </span>
          </div>
        </div>
        <p className="text-white/30 text-xs text-center sm:text-right">
          © {new Date().getFullYear()} Marcos Teixeira 1911. Todos os direitos reservados.
          <br />
          Material de campanha eleitoral fictício — peça de portfólio.
        </p>
      </div>
    </footer>
  )
}
