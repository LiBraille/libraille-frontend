import React, { useState } from 'react'
// Mudança importante: importamos BrowserRouter em vez de Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Home from './pages/Home/Home'
import About from './pages/About/About'
import NavBar from './components/navbar/Navbar'
import Contact from './pages/Contact/Contact'
import Product from './pages/Product/Product'
import Auth from './pages/Login/Auth'
import './App.css'
function App() {
  // Descomentei o estado caso você vá usar a tela de login separada das rotas
  const [telaAtual, setTelaAtual] = useState('home')

  if (telaAtual === 'login') {
    return <Auth onVoltar={() => setTelaAtual('home')} />
  }

  return (
    <Router>
  {/* Passamos a função de ir para o login para a NavBar aqui: */}
  <NavBar onIrParaLogin={() => setTelaAtual('login')} /> 
  
  <main className='container'>
    <Routes>
      {/* Removido o onIrParaLogin daqui, pois agora ele pertence à NavBar */}
      <Route path="/" element={<Home />} /> 
      <Route path="/sobre" element={<About />} />
      <Route path="/produto" element={<Product />} />
      <Route path="/contato" element={<Contact />} />
    </Routes>
  </main>
</Router>
  );
}

export default App;
