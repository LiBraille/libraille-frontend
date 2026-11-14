import './product.css'
import HowToUse from "../../components/HowToUse/HowToUse"
import Footer from '../../components/Footer/Footer'

function Product() {
  return (
    <>
    <section className="product-section">
      <h2>Conhecendo o dispositivo</h2>
      <iframe src="" frameborder="1" aria-label='Imagem/Vídeo de demonstração do produto'></iframe>
    </section>
      <HowToUse />
      <section className='convert-link'>
        <h2>Quer converter seus arquivos para Braille?</h2>
        <a href="/convert">Clique aqui</a>
      </section>
      <Footer />
    </>
  )
}

export default Product