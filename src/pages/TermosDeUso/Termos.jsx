import { Link } from 'react-router-dom'
import '../../styles/legal.css'

const Pendente = ({ children }) => (
  <span className="legal-todo">[CONFIRMAR: {children}]</span>
)

function Termos() {
  return (
    <section className="legal-page" aria-labelledby="legal-titulo">
      <h1 id="legal-titulo">Termos de Uso</h1>
      <p className="legal-date">
        Última atualização: <time dateTime="2026-11-14">14/11/2026</time>
      </p>

      <h2>Introdução</h2>
      <p>
        Estes Termos de Uso regulam o acesso e a utilização do site, dos serviços
        e do dispositivo LiBraille (“Plataforma”), uma solução de tecnologia
        assistiva que converte livros e documentos digitais em braille para
        leitura tátil. Ao acessar o site, solicitar um dispositivo ou usar o
        conversor, você declara que leu e aceita estas condições.
      </p>

      <h2>1. O que é o LiBraille</h2>
      <p>O LiBraille reúne duas partes que funcionam juntas:</p>
      <ul>
        <li>
          <strong>Dispositivo tátil:</strong> aparelho com uma célula braille de
          seis pontos. Pinos eletromecânicos sobem pelos orifícios do topo e
          formam, um a um, os caracteres do texto, que o leitor percebe com o
          dedo indicador.
        </li>
        <li>
          <strong>Plataforma web:</strong> conversor que recebe arquivos nos
          formatos TXT e EPUB, transforma o conteúdo em braille e o envia ao
          dispositivo por Wi-Fi ou cabo USB-C. Ao final da transferência, o site
          emite um aviso sonoro e um aviso em texto.
        </li>
      </ul>
      <p>
        O LiBraille destina-se, principalmente, a pessoas com deficiência visual
        e a instituições de apoio, e atua como intermediador tecnológico de
        acessibilidade à leitura.
      </p>

      <h2>2. Conta e acesso</h2>
      <ul>
        <li>
          <strong>Ativação por código:</strong> não há cadastro aberto. Após a
          aquisição do dispositivo, enviamos um código de ativação ao e-mail
          informado no pedido. Com o código, você cria a sua própria senha na
          página de <Link to="/ativar">ativação</Link> e passa a acessar o
          conversor.
        </li>
        <li>
          <strong>Código e senha pessoais:</strong> o código de ativação e a
          senha são pessoais e intransferíveis. A guarda deles é de
          responsabilidade do usuário, e a atividade realizada na conta será
          presumida como autorizada pelo titular.
        </li>
        <li>
          <strong>Uso adequado:</strong> é proibido compartilhar a conta, tentar
          burlar os mecanismos de segurança ou usar programas automatizados
          (bots, scrapers) sem autorização prévia.
        </li>
        <li>
          <strong>Informações verdadeiras:</strong> o usuário deve informar dados
          corretos e atualizados nos formulários do site.
        </li>
      </ul>

      <h2>3. Aquisição e doação de dispositivos</h2>
      <p>
        O site permite solicitar um dispositivo para uso próprio (compra) ou
        doar um dispositivo a quem precisa (doação), por meio de um formulário.
      </p>
      <ul>
        <li>
          <strong>Pedido de compra:</strong> pedimos nome, e-mail, telefone,
          quantidade e endereço de entrega. Após o pedido, a equipe entra em
          contato por e-mail com os próximos passos. <Pendente>preço, forma de
          pagamento, prazo e custo de entrega</Pendente>
        </li>
        <li>
          <strong>Doação:</strong> pedimos nome, e-mail e quantidade. Você pode
          doar de forma anônima e deixar uma mensagem opcional. A equipe entra em
          contato para combinar os detalhes. <Pendente>como o dispositivo
          doado é destinado a quem receberá</Pendente>
        </li>
        <li>
          <strong>Troca, garantia e arrependimento:</strong>{' '}
          <Pendente>política de troca, garantia e direito de arrependimento em
          compras feitas pela internet (Código de Defesa do Consumidor), com
          orientação jurídica</Pendente>
        </li>
      </ul>

      <h2>4. Envio de arquivos e direitos autorais</h2>
      <p>
        O conversor processa os arquivos enviados pelo próprio usuário:
      </p>
      <ul>
        <li>
          <strong>Responsabilidade pelo conteúdo:</strong> o usuário é o único
          responsável pela licitude e pela titularidade dos arquivos enviados.
        </li>
        <li>
          <strong>Finalidade acessível:</strong> a Lei de Direitos Autorais
          (Lei nº 9.610/98, art. 46, inciso I, alínea “d”) permite reproduzir
          obras em braille, sem fins comerciais, para uso exclusivo de pessoas
          com deficiência visual, em linha com o Tratado de Marraquexe. O
          usuário compromete-se a usar a conversão de obras protegidas somente
          nessa finalidade.
        </li>
        <li>
          <strong>Proibição de uso ilícito:</strong> é proibido usar a Plataforma
          para armazenar, distribuir ou vender obras piratas ou violar direitos
          de autores e editoras.
        </li>
      </ul>

      <h2>5. Propriedade intelectual</h2>
      <p>
        A marca LiBraille, a identidade visual, as interfaces, o código, os
        esquemáticos e o firmware do dispositivo pertencem aos criadores do
        projeto. O uso da Plataforma concede ao usuário uma licença pessoal, não
        exclusiva, intransferível e revogável de acesso aos serviços, sem ceder
        direitos de propriedade intelectual.
      </p>

      <h2>6. Natureza do projeto e limitação de responsabilidade</h2>
      <ul>
        <li>
          <strong>Projeto em evolução:</strong> o LiBraille é um projeto de
          inovação em tecnologia assistiva, em constante aprimoramento. Podem
          ocorrer falhas na formação de caracteres, lentidão na conexão com o
          dispositivo ou limitações de formato. No momento, o conversor aceita
          apenas TXT e EPUB.
        </li>
        <li>
          <strong>Disponibilidade:</strong> a equipe busca manter o serviço
          estável, mas não garante funcionamento ininterrupto, inclusive por
          falhas de serviços de terceiros.
        </li>
        <li>
          <strong>Arquivos:</strong> o LiBraille não é um serviço de backup.
          Mantenha sempre uma cópia dos seus arquivos originais.{' '}
          <Pendente>se os arquivos enviados ficam guardados e por quanto tempo,
          ou se são apagados após a conversão</Pendente>
        </li>
      </ul>

      <h2>7. Privacidade e proteção de dados</h2>
      <p>
        O tratamento de dados pessoais segue a Lei Geral de Proteção de Dados
        (Lei nº 13.709/2018). Coletamos somente o necessário para atender
        pedidos, ativar contas e fazer a conversão, e não vendemos dados a
        terceiros. Os detalhes estão na nossa{' '}
        <Link to="/privacidade">Política de Privacidade</Link>.
      </p>

      <h2>8. Alterações e encerramento</h2>
      <p>
        Podemos atualizar estes Termos para refletir melhorias técnicas ou
        exigências legais. Mudanças relevantes serão avisadas no site. Quem não
        concordar com as novas condições pode deixar de usar a Plataforma e
        pedir o encerramento da conta pelo e-mail de contato.
      </p>

      <h2>9. Contato e foro</h2>
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
        Para resolver eventuais conflitos, fica eleito o foro da Comarca de São
        Paulo/SP, ressalvado o direito do consumidor de ajuizar ação no foro do
        seu domicílio, quando a lei assim garantir.{' '}
        <Pendente>revisão desta cláusula com orientação jurídica</Pendente>
      </p>
    </section>
  )
}

export default Termos