import ProductHero from '../../components/ProductHero/ProductHero'
import ProductSteps from '../../components/ProductSteps/ProductSteps'
import ProductBuy from '../../components/ProductBuy/ProductBuy'
import './product.css'

export default function Product() {
    return (
        <div className="page-glow">
            <ProductHero />
            <ProductSteps />
            <ProductBuy />
        </div>
    )
}