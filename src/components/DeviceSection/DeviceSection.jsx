import './deviceSection.css'
import Arrom from '../../assets/IconArromE.png'
import Product from '../../assets/ImageproductE.png'


function DeviceSection() {
    return (
        <section className="device">
            <img
                className="device__product" 
                src={Product} 
                alt="Dispositivo cúbico azul-escuro de cantos arredondados, destacando na topo uma célula com seis orifícios organizados em duas colunas verticais de três furos e, na parte inferior frontal, uma porta de entrada USB-C sobre fundo branco."
            />
            <div className='device__content'>
                <h3 className='device__title'>Dispositivo LiBraille</h3>

                <p className='device__description'>
                    Desenvolvido para conectar leitores a qualquer conteúdo digital por meio de pinos eletromecânicos de alta resposta.
                </p>

                <button className="device__button" type="button">
                    Conheça o produto
                    <img src={Arrom} alt="" />
                </button>
            </div>
        </section>
    )
}

export default DeviceSection