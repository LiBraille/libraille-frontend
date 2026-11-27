import ProductHero from '../../components/ProductHero/ProductHero'
import ProductSteps from '../../components/ProductSteps/ProductSteps'
import ProductBuy from '../../components/ProductBuy/ProductBuy'
import { usePageTitle } from '../../hooks/usePageTitle'
import ProductControls from '../../components/ProductControls/ProductsControl'

export default function Product() {
    // Título da aba do navegador: "Produto | LiBraille"
    usePageTitle('Produto')

    // page-glow (definido no index.css) dá o fundo com os brilhos roxo e dourado
    return (
        <div className="page-glow">
            <ProductHero />
            <ProductSteps />
            <ProductControls />
            <ProductBuy />
        </div>
    )
}