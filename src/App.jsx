import React, { useState } from 'react';
import Home from './pages/Home/Home';
import Auth from './pages/Login/Auth';
import About from './pages/About/About';

function App() {
  const [telaAtual, setTelaAtual] = useState('home');

  if (telaAtual === 'login') {
    return <Auth onVoltar={() => setTelaAtual('home')} />;
  }


  return <Home onIrParaLogin={() => setTelaAtual('login')} />;
}

export default App;