import Home from './pages/Home'
import GlueDots from './components/GlueDots/GlueDots'
import Footer from './components/footer/Footer'
import './App.css'
function App() {

  return (
    <>
    <Home/>
   <GlueDots 
        className="painel" 
        
        // --- LAYOUT ---
        fill={false}              // Distribui as bolinhas por toda a tela
        columns={10}             // Quantidade de colunas
        rows={3}                // Quantidade de linhas
        inset={20}               // Margem interna para as bolinhas não tocarem a borda
        spacing={40}             // Distância interna entre os pinos da mesma célula
        cellSpacing={50}
        // --- CORES E VISUAL ---
        backgroundColor="none"// Cor do fundo do container
        color="#5d928d"          // Cor das bolinhas (ex: laranja)
        dotRadius={12}           // Tamanho de cada bolinha
        
        // --- FÍSICA DO CLIQUE ---
        tension={250}            // Velocidade com que voltam ao lugar
        bounce={20}              // Força do empurrão da onda
        
        // --- INTERAÇÃO COM O MOUSE  ---
        cursorInteraction={true} // Ativar magnetismo
        cursorRadius={180}       // Área de efeito do cursor
        cursorPull={100}         // Força de atração para o mouse
        cursorSwell={0.6}        // Quanto elas incham perto do mouse (0.6 = 60% maiores)
      />
      <Footer/>
    </>
  )
}

export default App