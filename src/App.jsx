import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Product from './pages/Product/Product'
import Auth from './pages/Login/Auth'
import Converter from './pages/Converter/Converter'
import './App.css'

function App() {
  const [telaAtual, setTelaAtual] = useState('home')

  if (telaAtual === 'login') {
    return <Auth onVoltar={() => setTelaAtual('home')} />
  }

  return (
    <Router>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <NavBar onIrParaLogin={() => setTelaAtual('login')} />

      <main id="conteudo" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produto" element={<Product />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/conversor" element={<Converter />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToHash />
    </Router>
  )
}

export default App