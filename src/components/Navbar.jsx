import { useState, useEffect } from 'react'

const links = [
  { href: '#quem-e', label: 'Quem é Marcos' },
  { href: '#propostas', label: 'Propostas' },
  { href: '#trajetoria', label: 'Trajetória' },
  { href: '#foto-com-candidato', label: 'Sua foto com Marcos' },
  { href: '#cadastro', label: 'Apoiar' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#16181D]/95 backdrop-blur-sm border-b border-white/10 shadow-lg' : 'bg-[#16181D]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#B91C1C] flex items-center justify-center shadow-md" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
            <span className="text-white font-bold text-xs font-display">MT</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-display text-base tracking-wide">Marcos Teixeira</span>
            <span className="text-[#B91C1C] text-[10px] uppercase tracking-widest font-medium">
              Deputado Estadual
            </span>
          </div>
          <span className="hidden sm:flex items-center justify-center ml-2 h-8 px-2.5 border border-[#4A5568] text-[#E5E7EB] font-black text-xs">
            1911
          </span>
        </a>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#cadastro"
            className="bg-[#B91C1C] text-white text-sm font-bold px-6 py-2.5 hover:bg-[#7F1414] transition-colors duration-200 shadow-sm uppercase tracking-wide"
          >
            Quero apoiar
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 text-white"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className={`md:hidden border-t border-white/10 overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#16181D] py-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-8 py-3.5 text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium border-b border-white/5 last:border-0 transition-colors uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <div className="px-8 py-4">
            <a
              href="#cadastro"
              onClick={() => setMenuOpen(false)}
              className="block bg-[#B91C1C] text-white font-bold text-sm px-6 py-3 text-center hover:bg-[#7F1414] transition-colors uppercase tracking-wide"
            >
              Quero apoiar
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
