import './howtouse.css'

function HowToUse() {
    return (
        <>
            <h3>Como usar?</h3>
            <div className="tutorial-cards">
                <div className="tutorial-card">
                    <img src="" alt="" className="tutorial-icons"/>
                    <h4>1. Envie o arquivo</h4>
                    <p>Faça o upload do seu livro em fomato digital ou PDF de forma simples e rápida</p>
                </div>
                <div className="tutorial-card">
                    <img src="" alt="" className="tutorial-icons"/>
                    <h4>2. Conversão Instantânea</h4>
                    <p>Nossa inteligência converte o texto para o código Braille de forma imediata</p>
                </div>
                <div className="tutorial-card">
                    <img src="" alt="" className="tutorial-icons"/>
                    <h4>3. Leitura Tátil</h4>
                    <p>O dispositivo físico recebe os dados e os transforma em leitura tátil acessível.</p>
                </div>
            </div>
            {/* <button id="tutorial-video-btn" onClick={showVideo}>Ver como funciona</button> */}
        </>
    )
}

export default HowToUse