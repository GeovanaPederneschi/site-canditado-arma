import Navbar from './components/Navbar'
import Hero from './components/Hero'
import QuemE from './components/QuemE'
import Propostas from './components/Propostas'
import Trajetoria from './components/Trajetoria'
import FotoComCandidato from './components/FotoComCandidato'
import Formulario from './components/Formulario'
import Redes from './components/Redes'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuemE />
        <Propostas />
        <Trajetoria />
        <FotoComCandidato />
        <Formulario />
        <Redes />
      </main>
      <Footer />
    </>
  )
}
