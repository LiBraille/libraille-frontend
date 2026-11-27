import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

// Páginas
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Product from './pages/Product/Product'
import Contact from './pages/Contact/Contact'
import Manual from './pages/Manual/Manual'
import Converter from './pages/Converter/Converter'
import Auth from './pages/Login/Auth'
import Activate from './pages/Login/Activate'
import Termos from './pages/TermosDeUso/Termos'
import Privacidade from './pages/PoliticaPrivacidade/PoliticaPrivacidade'
import NotFound from './pages/NotFound/NotFound'

// Componentes comuns
import NavBar from './components/navbar/Navbar'
import Footer from './components/Footer/Footer'
import BackToTop from './components/BackToTop/BackToTop'
import ScrollToHash from './components/ScrollToHash'
import RotaProtegida from './components/RotaProtegida/RotaProtegida'

// Layout = moldura comum: navbar em cima, página no meio, rodapé embaixo.
// O <Outlet /> é o espaço onde a página da rota atual aparece.
function Layout() {
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <NavBar />
      <main id="conteudo" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        {/* Páginas COM navbar e rodapé */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produto" element={<Product />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />

          {/* Só abrem depois do login */}
          <Route element={<RotaProtegida />}>
            <Route path="/manual" element={<Manual />} />
            <Route path="/conversor" element={<Converter />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Páginas SEM navbar e rodapé */}
        <Route path="/login" element={<Auth />} />
        <Route path="/ativar" element={<Activate />} />
      </Routes>
    </Router>
  )
}

export default App