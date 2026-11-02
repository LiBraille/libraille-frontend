import './faq.css'


function Faq() {
    return (
        <section className='faq'>
            <div >
                <h2>Perguntas Frequentes</h2>


                <ul className='faq-list'>
                    <li>
                        <input type="radio" name="acordeon" id="first" />
                        <label htmlFor="first"><span>1</span>O que é o LiBraille e como ele funciona?</label>
                        <div className='response'>
                            <p>O LiBraille é um dispositivo adaptativo de leitura tátil em Braille integrado a uma plataforma web. O usuário envia um arquivo de texto pelo site, o sistema em Python processa o conteúdo, converte os caracteres para Braille e os envia ao dispositivo físico, que representa o texto caractere por caractere de forma tátil.</p>
                        </div>
                    </li>
                    <li>
                        <input type="radio" name="acordeon" id="Second" />
                        <label htmlFor="Second"><span>2</span>A quem o LiBraille se destina?</label>
                        <div className='response'>
                            <p>Nosso foco principal é atender pessoas cegas ou com baixa visão, principalmente estudantes e leitores que necessitam de uma alternativa acessível para leitura. O dispositivo também é ideal para escolas, bibliotecas e instituições focadas em inclusão social e educacional.</p>
                        </div>
                    </li>
                    <li>
                        <input type="radio" name="acordeon" id="Third" />
                        <label htmlFor="Third"><span>3</span>Qual é o diferencial do LiBraille em relação a outros leitores Braille do mercado?</label>
                        <div className='response'>
                            <p>A maioria dos leitores e displays Braille disponíveis no mercado possui alto custo financeiro e tecnologia complexa. O LiBraille foi projetado como um MVP (Produto Mínimo Viável) focado na acessibilidade econômica, oferecendo uma solução inovadora, funcional e de baixo custo desenvolvida no Brasil.</p>
                        </div>
                    </li>
                    <li>
                        <input type="radio" name="acordeon" id="Fourth" />
                        <label htmlFor="Fourth"><span>4</span>Como posso enviar meus próprios livros ou documentos para leitura no dispositivo?</label>
                        <div className='response'>
                            <p>Basta acessar a plataforma web do LiBraille, fazer o upload do arquivo de texto desejado e iniciar a transmissão. O sistema converte automaticamente o texto em sinais para o hardware exibir a leitura em Braille.</p>
                        </div>
                    </li>
                </ul>

            </div>
        </section>
    )
}

export default Faq
