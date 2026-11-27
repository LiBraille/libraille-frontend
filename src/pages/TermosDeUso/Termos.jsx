import { Link } from 'react-router-dom'
import { usePageTitle } from '../../hooks/usePageTitle'
import '../../styles/legal.css'

// Marcador amarelo para o que o grupo ainda precisa confirmar.
// Antes de publicar de vez, resolva todos e apague este componente.
const Pendente = ({ children }) => (
  <span className="legal-todo">[CONFIRMAR: {children}]</span>
)

function Termos() {
  usePageTitle('Termos de Uso')

  return (
    <section className="legal-page" aria-labelledby="legal-titulo">
      <h1 id="legal-titulo">Termos de Uso</h1>
      <p className="legal-date">
        Última atualização: <time dateTime="2026-11-22">22/11/2026</time>
      </p>

      <h2>Introdução</h2>
      <p>
        Estes Termos de Uso regulam o acesso e a utilização do site e dos serviços do
        LiBraille (“Plataforma”), uma solução de tecnologia assistiva que converte livros e
        documentos digitais em braille para leitura tátil em um dispositivo próprio. O
        LiBraille é um projeto acadêmico, desenvolvido por estudantes do curso de
        Desenvolvimento Web com Python do Instituto Proa. Ao usar o site, você declara que
        leu e aceita estas condições.
      </p>

      <h2>1. O que é o LiBraille</h2>
      <p>O LiBraille reúne duas partes que funcionam juntas:</p>
      <ul>
        <li>
          <strong>Dispositivo tátil:</strong> aparelho com uma célula braille de seis
          pontos. Pinos eletromecânicos sobem pelos orifícios do topo e formam, um a um, os
          caracteres do texto, que o leitor percebe com o dedo indicador.
        </li>
        <li>
          <strong>Plataforma web:</strong> conversor que recebe arquivos nos formatos TXT e
          EPUB e transforma o conteúdo em braille. Ao concluir a conversão, o site emite um
          aviso sonoro e um aviso em texto.
        </li>
      </ul>
      <p>
        O envio do conteúdo convertido ao dispositivo (por cabo USB-C) está em
        desenvolvimento e pode não estar disponível nesta fase do projeto.
      </p>

      <h2>2. Acesso ao conversor e conta</h2>
      <ul>
        {/* <li>
          <strong>Fase de demonstração:</strong> nesta fase, o conversor pode ser usado sem
          login. Esta regra poderá mudar: no futuro, o acesso deverá ser restrito a quem
          adquirir o dispositivo.
        </li> */}
        <li>
          <strong>Ativação por código:</strong> não há cadastro aberto. Quando a conta for
          exigida, o código de ativação será enviado ao e-mail informado no pedido, e você
          criará a sua senha na página de <Link to="/ativar">ativação</Link>.
        </li>
        <li>
          <strong>Código e senha pessoais:</strong> são intransferíveis. A guarda deles é de
          responsabilidade do usuário.
        </li>
        <li>
          <strong>Uso adequado:</strong> é proibido tentar burlar os mecanismos de segurança
          ou usar programas automatizados (bots, scrapers) sem autorização prévia.
        </li>
      </ul>

      <h2>3. Aquisição e doação de dispositivos</h2>
      <p>
        O site oferece um formulário para solicitar um dispositivo para uso próprio (compra)
        ou doar um dispositivo a quem precisa (doação).
      </p>
      <ul>
        <li>
          <strong>Pedido de compra:</strong> pedimos nome, e-mail, telefone, quantidade e
          endereço de entrega. A equipe entra em contato por e-mail com os próximos passos.{' '}
          <Pendente>se o formulário já está ativo no backend; preço, forma de pagamento,
          prazo e custo de entrega</Pendente>
        </li>
        <li>
          <strong>Doação:</strong> pedimos nome, e-mail e quantidade. Você pode doar de forma
          anônima e deixar uma mensagem opcional. A equipe entra em contato para combinar os
          detalhes. <Pendente>como o dispositivo doado é destinado a quem receberá</Pendente>
        </li>
        <li>
          <strong>Troca, garantia e arrependimento:</strong>{' '}
          <Pendente>política de troca, garantia e direito de arrependimento em compras pela
          internet (Código de Defesa do Consumidor), com orientação jurídica</Pendente>
        </li>
      </ul>

      <h2>4. Envio de arquivos e direitos autorais</h2>
      <ul>
        <li>
          <strong>Responsabilidade pelo conteúdo:</strong> o usuário é o único responsável
          pela licitude e pela titularidade dos arquivos que envia ao conversor.
        </li>
        <li>
          <strong>Finalidade acessível:</strong> a Lei de Direitos Autorais (Lei nº 9.610/98,
          art. 46, inciso I, alínea “d”) permite reproduzir obras em braille, sem fins
          comerciais, para uso exclusivo de pessoas com deficiência visual, em linha com o
          Tratado de Marraquexe. O usuário compromete-se a usar a conversão de obras
          protegidas somente nessa finalidade.
        </li>
        <li>
          <strong>Proibição de uso ilícito:</strong> é proibido usar a Plataforma para
          distribuir ou vender obras piratas ou violar direitos de autores e editoras.
        </li>
        <li>
          <strong>Seu livro não é guardado pelo site:</strong> o conteúdo convertido e a
          lista de livros ficam apenas na memória do seu navegador, enquanto a página está
          aberta. Ao recarregar ou fechar a página, tudo é descartado. O LiBraille não é um
          serviço de backup: mantenha sempre uma cópia dos seus arquivos originais.{' '}
          <Pendente>confirmar com o backend se o servidor apaga o arquivo logo após a
          conversão</Pendente>
        </li>
      </ul>

      <h2>5. Uso do dispositivo</h2>
      <p>
        Os livros transferidos ficam armazenados no próprio dispositivo. Para apagar um
        livro do aparelho, segure o botão físico dele por 10 segundos. O site não apaga
        livros do dispositivo; a lista exibida na página é apenas a da sua sessão.
      </p>

      <h2>6. Propriedade intelectual</h2>
      <p>
        A marca LiBraille, a identidade visual, as interfaces, o código, os esquemáticos e o
        firmware do dispositivo pertencem aos criadores do projeto. O uso da Plataforma
        concede ao usuário uma licença pessoal, não exclusiva, intransferível e revogável de
        acesso aos serviços, sem ceder direitos de propriedade intelectual. As bibliotecas e
        recursos de terceiros usados no site seguem as licenças de cada autor.
      </p>

      <h2>7. Natureza do projeto e limitação de responsabilidade</h2>
      <ul>
        <li>
          <strong>Projeto em evolução:</strong> o LiBraille é um projeto acadêmico de
          tecnologia assistiva, em constante aprimoramento. Podem ocorrer falhas na formação
          de caracteres, indisponibilidade de recursos (como a transferência ao dispositivo)
          e limitações de formato. No momento, o conversor aceita apenas TXT e EPUB.
        </li>
        <li>
          <strong>Disponibilidade:</strong> a equipe busca manter o serviço estável, mas não
          garante funcionamento ininterrupto, inclusive por falhas de serviços de terceiros.
        </li>
      </ul>

      <h2>8. Privacidade e proteção de dados</h2>
      <p>
        O tratamento de dados pessoais segue a Lei Geral de Proteção de Dados (Lei nº
        13.709/2018). Os detalhes estão na nossa{' '}
        <Link to="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>9. Alterações e encerramento</h2>
      <p>
        Podemos atualizar estes Termos para refletir melhorias técnicas ou exigências legais.
        Mudanças relevantes serão avisadas no site. Quem não concordar com as novas condições
        pode deixar de usar a Plataforma e pedir o encerramento da conta pelo e-mail de
        contato.
      </p>

      <h2>10. Contato e foro</h2>
      <ul>
        <li>
          <strong>E-mail:</strong>{' '}
          <a href="mailto:projeto.libraille@gmail.com">projeto.libraille@gmail.com</a>
        </li>
        <li>
          <strong>Localidade:</strong> São Paulo — SP, Brasil
        </li>
      </ul>
      <p>
        Para resolver eventuais conflitos, fica eleito o foro da Comarca de São Paulo/SP,
        ressalvado o direito do consumidor de ajuizar ação no foro do seu domicílio, quando a
        lei assim garantir. <Pendente>revisão desta cláusula com orientação jurídica</Pendente>
      </p>
    </section>
  )
}

export default Termos