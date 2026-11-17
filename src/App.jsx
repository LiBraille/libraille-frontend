import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Product from './pages/Product/Product'
import Auth from './pages/Login/Auth'
import Converter from './pages/Converter/Converter'
import NavBar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import ScrollToHash from './components/ScrollToHash'
import Termos from './pages/TermosDeUso/Termos'
import Privacidade from './pages/PoliticaPrivacidade/PoliticaPrivacidade'
import './App.css'
import Activate from './pages/Login/Activate'

// Estrutura das páginas comuns (com navbar e footer)
function Layout() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <NavBar />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produto" element={<Product />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/conversor" element={<Converter />} />
        </Route>

        {/* Sem navbar e footer */}
        <Route path="/login" element={<Auth />} />
        <Route path="/ativar" element={<Activate />} />
      </Routes>
    </Router>
  )
}

export default App