import { Link } from 'react-router-dom'
import '../../styles/legal.css'

const Pendente = ({ children }) => (
  <span className="legal-todo">[CONFIRMAR: {children}]</span>
)

function Politica() {
  return (
    <section className="legal-page" aria-labelledby="legal-titulo">
      <h1 id="legal-titulo">Política de Privacidade</h1>
      <p className="legal-date">
        Última atualização: <time dateTime="2026-11-14">14/11/2026</time>
      </p>

      <h2>Introdução</h2>
      <p>
        Esta política explica quais dados pessoais o LiBraille coleta, para que
        os usa, com quem os compartilha e quais são os seus direitos. Ela vale
        para o nosso site <Pendente>endereço completo do site</Pendente> e para os
        serviços ligados a ele (pedidos, ativação de conta e conversor), e segue
        a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018).
      </p>

      <h2>Quem é o responsável pelos dados</h2>
      <p>
        O LiBraille é um projeto desenvolvido por uma equipe de estudantes no
        SENAC Lapa Tito, em São Paulo — SP.{' '}
        <Pendente>nome do responsável legal pelo projeto e CNPJ, se houver. Se o
        projeto não tiver CNPJ, informe isso aqui em vez de um número</Pendente>
      </p>

      <h2>Dados que coletamos</h2>
      <h3>Dados que você nos informa</h3>
      <ul>
        <li>
          <strong>Pedido de compra:</strong> nome, e-mail, telefone, quantidade
          e endereço de entrega (CEP, rua, número, complemento, cidade e estado).
        </li>
        <li>
          <strong>Doação:</strong> nome, e-mail, quantidade, a opção de doar de
          forma anônima e a mensagem opcional para quem receber.
        </li>
        <li>
          <strong>Conta:</strong> e-mail, código de ativação e a senha que você
          cria. A senha é guardada de forma protegida, e não em texto legível.{' '}
          <Pendente>confirmar com o backend que a senha é armazenada com
          hash</Pendente>
        </li>
        <li>
          <strong>Arquivos enviados ao conversor:</strong> os livros e
          documentos TXT ou EPUB que você escolhe converter. Eles podem conter
          informações pessoais suas ou de terceiros; envie apenas o que tiver
          direito de usar.
        </li>
        <li>
          <strong>Mensagens:</strong> o que você escrever ao entrar em contato
          conosco.
        </li>
      </ul>

      <h3>Dados coletados automaticamente</h3>
      <p>
        Ao usar o site, o servidor pode registrar dados técnicos, como endereço
        IP, navegador, dispositivo e data e hora do acesso, para segurança e
        funcionamento do serviço. <Pendente>se há ferramenta de análise de
        acessos (por exemplo, Google Analytics) e se há registro de logs</Pendente>
      </p>

      <h2>Cookies e armazenamento no navegador</h2>
      <ul>
        <li>
          <strong>Sessão de login:</strong> depois de entrar, guardamos um cookie
          para manter você conectado. Ele é essencial e funciona só no nosso
          site. <Pendente>confirmar com o backend</Pendente>
        </li>
        <li>
          <strong>Preferência de tema:</strong> o tema claro ou escuro que você
          escolhe fica salvo no seu próprio navegador e não é enviado a nós.
        </li>
        <li>
          <strong>Publicidade:</strong> não usamos cookies de publicidade nem
          rastreamento para anúncios.
        </li>
      </ul>
      <p>
        Você pode apagar ou bloquear cookies nas configurações do navegador.
        Bloquear o cookie de sessão impede o acesso ao conversor.
      </p>

      <h2>Para que usamos os dados</h2>
      <ul>
        <li>Receber e processar pedidos de compra e doação;</li>
        <li>Entrar em contato sobre o pedido, a entrega e a ativação da conta;</li>
        <li>Criar e proteger a sua conta e permitir o uso do conversor;</li>
        <li>Converter os arquivos enviados e transferi-los ao dispositivo;</li>
        <li>Responder dúvidas e pedidos feitos pelo contato;</li>
        <li>Manter a segurança do site e melhorar o serviço;</li>
        <li>Cumprir obrigações legais.</li>
      </ul>
      <p>
        <Pendente>base legal de cada finalidade (execução de contrato,
        consentimento, obrigação legal, legítimo interesse), com orientação
        jurídica</Pendente>
      </p>

      <h2>Com quem compartilhamos</h2>
      <p>Não vendemos seus dados. Podemos compartilhá-los apenas com:</p>
      <ul>
        <li>
          <strong>Serviços que fazem o site funcionar,</strong> como hospedagem
          do site e do servidor e envio de e-mails.{' '}
          <Pendente>nomes dos serviços realmente usados e, se houver, empresa de
          pagamento e transportadora</Pendente>
        </li>
        <li>
          <strong>Autoridades,</strong> quando a lei exigir ou para proteger
          direitos do projeto e de outras pessoas.
        </li>
      </ul>

      <h2>Vídeos e links externos</h2>
      <p>
        As páginas de produto podem exibir vídeos hospedados no YouTube, em modo
        de privacidade reforçada. Ao assistir, o YouTube pode tratar dados do seu
        acesso conforme a política dele. O vídeo só é carregado quando você clica
        para assisti-lo. O site também tem links para redes sociais (GitHub,
        LinkedIn e Instagram), cujas políticas de privacidade são próprias e
        sobre as quais não temos controle.
      </p>

      <h2>Por quanto tempo guardamos</h2>
      <p>
        Guardamos os dados pelo tempo necessário para cumprir as finalidades
        acima e as obrigações legais. <Pendente>prazos de guarda para pedidos,
        contas e arquivos enviados, e o que acontece depois do encerramento da
        conta</Pendente>
      </p>

      <h2>Seus direitos</h2>
      <p>Pela LGPD, você pode pedir, a qualquer momento:</p>
      <ul>
        <li>confirmação de que tratamos seus dados e acesso a eles;</li>
        <li>correção de dados incompletos ou desatualizados;</li>
        <li>anonimização, bloqueio ou eliminação de dados desnecessários;</li>
        <li>portabilidade dos dados;</li>
        <li>informações sobre com quem compartilhamos seus dados;</li>
        <li>retirada do consentimento, quando o tratamento depender dele.</li>
      </ul>
      <p>
        Para exercer esses direitos, escreva para{' '}
        <a href="mailto:projeto.libraille@gmail.com">projeto.libraille@gmail.com</a>.
        Você também pode reclamar à Autoridade Nacional de Proteção de Dados
        (ANPD).
      </p>

      <h2>Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais para proteger seus dados
        contra acesso indevido, perda ou alteração. Nenhum sistema é totalmente
        seguro; se houver incidente que possa causar risco relevante, avisaremos
        você e as autoridades, conforme a lei.
      </p>

      <h2>Alterações nesta política</h2>
      <p>
        Podemos atualizar esta política. A versão atual fica sempre publicada
        nesta página, com a data da última revisão. O uso do site também é
        regido pelos nossos <Link to="/termos">Termos de Uso</Link>.
      </p>

      <h2>Contato</h2>
      <p>
        Dúvidas sobre privacidade? Fale com a equipe em{' '}
        <a href="mailto:projeto.libraille@gmail.com">projeto.libraille@gmail.com</a>.{' '}
        <Pendente>nome e contato da pessoa encarregada pelos dados (o
        “encarregado” da LGPD), se houver</Pendente>
      </p>
    </section>
  )
}

export default Politica