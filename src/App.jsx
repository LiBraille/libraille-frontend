import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import NavBar from "./components/navbar/Navbar";
import Contact from "./pages/Contact/Contact";
import Product from "./pages/Product/Product";
import Auth from "./pages/Login/Auth";
import Termos from "./components/TermosDeUso/Termos";
import Privacidade from "./components/PoliticaPrivacidade/Politica";
import "./App.css";

function App() {
  const [telaAtual, setTelaAtual] = useState("home");

  if (telaAtual === "login") {
    return <Auth onVoltar={() => setTelaAtual("home")} />;
  }

  return (
    <Router>
      <NavBar onIrParaLogin={() => setTelaAtual("login")} />

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/produto" element={<Product />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/termos-de-uso" element={<Termos />} />
          <Route path="/politica-de-privacidade" element={<Privacidade />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
