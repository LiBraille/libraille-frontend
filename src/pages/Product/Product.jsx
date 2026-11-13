import './product.css'
import HowToUse from "../../components/HowToUse/HowToUse"
import ClientReview from '../../components/ClientsAvaliation/ClientReview'
import Footer from '../../components/Footer/Footer'

function Product() {
  return (
    <>
    <section className="product-section">
      <h2>Conhecendo o dispositivo</h2>
      <iframe src="" frameborder="1" aria-label='Imagem/Vídeo de demonstração do produto'></iframe>
    </section>
      <HowToUse />
      <ClientReview />
      <Footer />
    </>
  )
}

export default Product