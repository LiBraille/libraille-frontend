import './product.css'
import HowToUse from "../../components/HowToUse/HowToUse"
import Footer from '../../components/Footer/Footer'
// import productImage from '../../assets/product-image.png'

function Product() {
  return (
    <>
    <section className="product-section">
      <h2>Conhecendo o dispositivo</h2>
      {/* <iframe src="" frameborder="1" aria-label='Imagem/Vídeo de demonstração do produto'></iframe> */}
      {/* <img src={productImage} alt="Imagem da persona, Cecilia, segurando o dispositivo" /> */}
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