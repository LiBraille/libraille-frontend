import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

// Páginas
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Product from './pages/Product/Product'
import Contact from './pages/Contact/Contact'
import Converter from './pages/Converter/Converter'
import Auth from './pages/Login/Auth'
import Activate from './pages/Login/Activate'
import Termos from './pages/TermosDeUso/Termos'
import Privacidade from './pages/PoliticaPrivacidade/PoliticaPrivacidade'

// Componentes que aparecem em várias páginas
import NavBar from './components/navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollToHash from './components/ScrollToHash'

import NotFound from './pages/NotFound/NotFound'

// Layout = a "moldura" comum: navbar em cima, conteúdo no meio, footer embaixo.
// O <Outlet /> é o espaço onde a página da rota atual é mostrada.
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
        {/* Páginas COM navbar e footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produto" element={<Product />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/conversor" element={<Converter />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="/privacidade" element={<Privacidade />} />
          {/* O "*" significa "qualquer endereço que não existe" */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Páginas SEM navbar e footer */}
        <Route path="/login" element={<Auth />} />
        <Route path="/ativar" element={<Activate />} />
      </Routes>
    </Router>
  )
}

export default App