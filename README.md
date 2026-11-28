# LiBraille: front-end
 
> **Histórias que ganham relevo**
 
Site do **LiBraille**, um dispositivo de leitura tátil para pessoas com deficiência visual. O site apresenta o projeto e o produto, recebe pedidos de compra e doação, ativa a conta de quem adquiriu o dispositivo e converte livros em **TXT** ou **EPUB** para o formato braille.
 
Projeto acadêmico desenvolvido por estudantes do curso de Desenvolvimento Web com Python do Instituto Proa.
 
**Site publicado:** https://libraille.vercel.app
 
---
 
## Sumário
 
- [Sobre o projeto](#sobre-o-projeto)
- [Status: o que funciona e o que ainda não](#status-o-que-funciona-e-o-que-ainda-não)
- [Tecnologias](#tecnologias)
- [Como rodar](#como-rodar)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Rotas](#rotas)
- [Integração com o back-end](#integração-com-o-back-end)
- [Tema e design](#tema-e-design)
- [Acessibilidade](#acessibilidade)
- [Decisões de arquitetura](#decisões-de-arquitetura)
- [Deploy na Vercel](#deploy-na-vercel)
- [Convenções para contribuir](#convenções-para-contribuir)
- [Pendências conhecidas](#pendências-conhecidas)
- [Equipe](#equipe)
- [Créditos e transparência](#créditos-e-transparência)
- [Licença](#licença)
---
 
## Sobre o projeto
 
O LiBraille une o sistema braille e a tecnologia para ampliar o acesso à leitura. O dispositivo tem uma célula braille de seis pinos: os pinos sobem e descem para formar, uma letra por vez, o texto de um livro, que a pessoa lê com o dedo indicador.
 
O site é a parte de software e cobre este fluxo:
 
1. A pessoa conhece o projeto e solicita um dispositivo (compra) ou doa um.
2. Recebe um código de ativação por e-mail e cria a própria senha. Não existe cadastro aberto.
3. Depois do **login**, tem acesso ao **Manual de uso** (como converter e como usar o dispositivo) e ao **Conversor**.
4. No Conversor, escolhe um arquivo TXT ou EPUB. O servidor converte para braille, e o site avisa em texto e com um som quando termina.
5. O livro convertido é transferido ao dispositivo **por cabo USB**.
6. O dispositivo tem uma célula de leitura dinâmica (um caractere por vez), que avança sozinha ou no ritmo da pessoa, e **três botões**: avançar, retroceder e pausar. No botão de pausar, três cliques rápidos mudam a velocidade e segurar por 10 segundos apaga o arquivo do dispositivo. O site não apaga nada do dispositivo.
**Missão:** possibilitar que pessoas com deficiência visual tenham maior acesso aos livros através da tecnologia.
 
**Valores:** inovação, empatia, autonomia e acessibilidade.
 
## Status: o que funciona e o que ainda não
 
| Recurso | Status |
|---|---|
| Navegação, temas claro e escuro, animações, FAQ, Sobre, Produto, Termos e Política | Funcionam sem back-end |
| Contato | Funciona, mas **não envia pelo site**: abre o programa de e-mail da pessoa com a mensagem pronta (`mailto`) |
| Conversão de livros | Depende do back-end (`POST /traduzir`) |
| Pedido de compra e doação | Front-end pronto. Depende do back-end (`POST /pedidos`) |
| Login e ativação de conta | **Simulados** no modo demonstração (`MODO_DEMO` em `src/services/auth.js`). O login real, com back-end, ainda não está ligado |
| Manual de uso e Conversor | Só abrem depois do login (simulado). A proteção é só visual: a segurança real precisa estar no back-end |
| **Transferência ao dispositivo** | **Simulada.** O botão Transferir apenas espera 400 ms e mostra sucesso. Nenhum dado é enviado ao aparelho. A transferência prevista é **por cabo USB** |
 
Sem o back-end, a pessoa vê mensagens em português como "Não foi possível conectar ao servidor" ou "Este recurso ainda não está disponível", e nunca erros técnicos.
 
## Tecnologias
 
| Tecnologia | Para que serve |
|---|---|
| [React 19](https://react.dev) | Interface em componentes |
| [Vite 8](https://vite.dev) | Servidor de desenvolvimento e build |
| [React Router 7](https://reactrouter.com) | Rotas (`BrowserRouter`) |
| [react-icons](https://react-icons.github.io/react-icons/) | Ícones |
| [GSAP](https://gsap.com) e `@gsap/react` | Efeito de texto da Home e linha do tempo da página Sobre |
| [oxlint](https://oxc.rs/docs/guide/usage/linter) | Verificação de código |
| CSS puro com variáveis | Todo o visual, sem Tailwind |
 
Fonte: **Roboto**, pelo Google Fonts.
 
## Como rodar
 
### Pré-requisitos
 
- [Node.js](https://nodejs.org) em versão LTS recente e npm
- Git
- Back-end do projeto (Python) rodando em `http://127.0.0.1:8000`, para o conversor e os pedidos funcionarem (o login é simulado no modo demonstração)
### Instalação
 
```bash
git clone <url-deste-repositorio>
cd libraille-frontend
npm install
cp .env.example .env
npm run dev
```
 
Abra o endereço que o terminal mostrar (normalmente `http://localhost:5173`).
 
### Variável de ambiente
 
| Variável | Descrição |
|---|---|
| `VITE_API_URL` | Endereço do back-end. **Em desenvolvimento, deixe vazio:** o proxy do Vite resolve. **Em produção é obrigatória**, com `https` |
 
O arquivo `.env` não vai para o GitHub. O `.env.example` mostra a variável vazia.
 
### Proxy de desenvolvimento
 
O `vite.config.js` repassa estes caminhos ao back-end em `http://127.0.0.1:8000`:
 
- `/pedidos`
- `/auth`
- `/traduzir`
Isso evita bloqueio de CORS no computador de quem desenvolve. Usamos `127.0.0.1` e não `localhost` porque, em versões novas do Node, `localhost` pode apontar para outro endereço e a conexão com o uvicorn falha. **O proxy não existe no site publicado.**
 
### Comandos
 
| Comando | O que faz |
|---|---|
| `npm run dev` | Roda o site em modo de desenvolvimento |
| `npm run build` | Gera a versão final na pasta `dist`. É também o melhor teste de erros: rode antes de cada envio ao GitHub |
| `npm run lint` | Aponta imports e variáveis sem uso |
| `npm run preview` | Abre a versão gerada pelo build |
 
## Estrutura de pastas
 
```
libraille-frontend/
├── index.html            Fontes, tema inicial e botão de acessibilidade (Sienna)
├── vite.config.js        Configuração do Vite e proxy
├── vercel.json           Regra para as rotas funcionarem ao recarregar a página
├── package.json
└── src/
    ├── main.jsx          Ponto de entrada (ThemeProvider e index.css)
    ├── App.jsx           Rotas e moldura comum (Layout)
    ├── index.css         Reset, cores, fontes, botões, campos e utilitários
    ├── assets/           Imagens (logos, produto, fotos da equipe)
    ├── context/          ThemeContext.jsx (tema) e AuthContext.jsx (sessão simulada)
    ├── data/             teamMembers.js (equipe) e deviceControls.js (botões do dispositivo)
    ├── hooks/            useConversor, useAvisoSaida, usePageTitle
    ├── services/         api.js, auth.js, orders.js, converter.js (únicos arquivos que falam com o back-end)
    ├── utils/            chime.js (som de conclusão), stacksIcons.jsx
    ├── styles/           legal.css (Termos e Política)
    ├── components/       Uma pasta por componente, com .jsx e .css
    └── pages/            Uma pasta por página
```
 
Componentes por área:
 
- **Estrutura:** `NavBar`, `Footer`, `BackToTop`, `ScrollToHash`, `Reveal`, `RotaProtegida`
- **Home:** `Hero`, `ScrambleText`, `DeviceSection`, `BrailleCell`, `Faq`, `CallToAction`, `PhotoCircles`
- **Sobre:** `AboutStory`, `AboutPurpose`, `AboutValues`, `TeamDescription`
- **Produto:** `ProductHero`, `ProductSteps`, `ProductControls`, `ProductBuy`, `OrderModal`
- **Conversor:** `UploadBook`, `FileStatus`, `SyncedBooks`
- **Outros:** `ContactForm`, `BrailleBackground`
## Rotas
 
Com navbar e rodapé:
 
| Endereço | Página |
|---|---|
| `/` | Home |
| `/sobre` | Sobre |
| `/produto` | Produto (inclui o formulário de compra e doação) |
| `/contato` | Contato |
| `/manual` | Manual de uso (exige login) |
| `/conversor` | Conversor de livros (exige login) |
| `/termos` | Termos de Uso |
| `/privacidade` | Política de Privacidade |
| qualquer outro | Página 404 |
 
Sem navbar e rodapé: `/login` e `/ativar`.
 
Âncoras usadas no site: `/#faq`, `/produto#comprar` e `#como-usar`.
 
## Integração com o back-end
 
Nenhum componente chama o back-end direto: tudo passa por `src/services`. Se uma rota ou um nome de campo mudar, só o arquivo do service muda.
 
No **modo demonstração**, `entrar`, `ativarConta` e `sair` não chamam o back-end: usam uma conta e um código de demonstração definidos em `src/services/auth.js`.
 
| Rota | Entrada | Saída esperada |
|---|---|---|
| `POST /traduzir?tabela=ptbr` | `multipart/form-data`, campo `arquivo` (TXT ou EPUB) | JSON com `binario_base64` |
| `POST /pedidos` | JSON de compra ou doação (veja abaixo) | JSON com `id` |
| `POST /auth/login` | `{ email, senha }` | Cookie de sessão. `401` se incorreto |
| `POST /auth/ativar` | `{ email, codigo, senha }` | Sucesso, ou erro com mensagem |
| `POST /auth/logout` | nada | Apaga o cookie (nenhuma tela usa ainda) |
 
**Pedido de compra:** `tipo: 'compra'`, `nome`, `email`, `quantidade` (inteiro), `telefone`, `endereco { cep, rua, numero, complemento, cidade, estado }`.
 
**Pedido de doação:** `tipo: 'doacao'`, `nome`, `email`, `quantidade`, `anonimo` (booleano), `mensagem` (até 300 caracteres).
 
**Erros:** o front aceita `{ message: texto }` e `{ detail: texto }` (padrão do FastAPI). `404` vira "Este recurso ainda não está disponível". Falha de rede vira "Não foi possível conectar ao servidor".
 
**O que o back-end precisa validar de novo.** As validações do front são só conforto para quem usa o site:
 
- Tipo e conteúdo real do arquivo enviado, tamanho (o front assume 50 MB) e limite de requisições.
- Todos os campos dos pedidos, com consultas parametrizadas no banco.
- Senha com hash, limite de tentativas de login e ativação, e mensagens de erro iguais para e-mail inexistente e senha errada.
- Código de ativação gerado de forma segura, com validade e uso único.
- Cookie de sessão com `HttpOnly`, `Secure` e `SameSite` adequado.
- CORS liberando o endereço do site, e API em `https`.
- Se o servidor guarda ou apaga o arquivo enviado ao conversor. O texto do site só diz que o **navegador** não guarda o livro.
## Tema e design
 
- O tema é o atributo `data-theme` (`light` ou `dark`) no elemento `html`. A escolha fica salva no navegador (`localStorage`, chave `theme`) e, na primeira visita, segue a preferência do sistema. Um script no `<head>` do `index.html` aplica o tema antes de a página aparecer, para evitar um piscar com o tema errado.
- Todas as cores são **variáveis CSS** definidas em `src/index.css`. Regra do projeto: nunca escrever uma cor fixa dentro de um componente.
- `--accent-color` (dourado) é para fundos e bordas. Para **texto** dourado, use `--accent-text`, que no tema claro é mais escuro para dar contraste.
- Blocos que ficam escuros nos dois temas (rodapé, cartão de doação, caixa de upload, painel do login) usam `data-surface="dark"`.
- Classes globais: `.btn`, `.btn--primary` e `.btn--ghost` (botões), `.field` (campos), `.page-glow` (fundo com brilhos), `.sr-only` e `.skip-link`.
- Paleta: azul-marinho `#0F172A`, creme `#FDFBF7`, dourado `#D9B03F` e roxo `#3f0157`.
- Tamanhos em `rem` e `clamp()`. Alvos de toque de pelo menos 44 por 44 pixels.
## Acessibilidade
 
O produto é para pessoas cegas, então a acessibilidade é requisito, não extra. O código foi revisado com base no **WCAG 2.2 nível AA**:
 
- HTML semântico: landmarks, um `h1` por página, listas e tabelas com `scope`.
- Link "Pular para o conteúdo". Navegação completa por teclado, com contorno de foco visível em todo o site.
- Ao trocar de página, o foco vai para o título (`h1`), para leitores de tela anunciarem a mudança.
- Rótulos acessíveis em botões com ícone, `aria-expanded`, `aria-pressed` e `aria-current` nos estados.
- Avisos de status (`role="status"` e `role="alert"`). O som de conclusão da conversão sempre vem acompanhado de aviso em texto.
- Formulários com `label`, erro ligado ao campo, foco no primeiro erro e `autocomplete`.
- Contraste revisado em textos, bordas de campo e mensagens de erro. **Limitação conhecida:** o texto claro dos botões dourados tem contraste baixo (estimado em cerca de 2 para 1, a confirmar com uma ferramenta), abaixo do mínimo de 4,5 para 1 do WCAG.
- Animações contínuas rodam por cerca de 5 segundos e param. Quem pediu movimento reduzido no sistema vê tudo sem animação.
**Limite honesto:** a conferência foi feita lendo o código. Ainda faltam testes com leitor de tela (NVDA, VoiceOver) e com pessoas cegas ou com baixa visão. O site também carrega o widget de acessibilidade Sienna (terceiros), que pode alterar cores e fontes.
 
## Decisões de arquitetura
 
- **`BrowserRouter` e não o roteador de dados.** É mais simples. Consequência: o aviso de saída do Conversor só funciona ao recarregar ou fechar a aba, e não ao clicar em links internos.
- **Camada `services`.** Concentra endereços e formatos do back-end em quatro arquivos.
- **Conversor só na memória do navegador.** Nada vai para `localStorage`. A lista de livros some ao recarregar a página. O motivo é a privacidade em computadores compartilhados e evitar livros "fantasma" depois do F5. Existe um aviso do navegador ao recarregar com livros na lista.
- **Sem botão de excluir no site.** Apagar livros do dispositivo é feito pelo botão físico dele.
- **Login simulado no Demo Day.** `MODO_DEMO` em `src/services/auth.js` liga uma conta de demonstração, e a sessão é só um marcador em `sessionStorage` (some ao fechar a aba). A rota protegida (`RotaProtegida`) esconde Manual e Conversor de quem não entrou, mas **isso não é segurança**: qualquer pessoa pode contornar no navegador. Para o login real: desligar `MODO_DEMO`, exigir sessão no back-end, ligar `withCredentials` em `services/converter.js` e trocar o marcador por uma consulta a um endpoint como `GET /auth/eu`.
- **`XMLHttpRequest` no envio do arquivo**, porque o `fetch` não informa o progresso do envio.
- **`Reveal` (IntersectionObserver) para as animações de entrada.** GSAP direto só em `AboutValues`, para a linha que enche conforme a rolagem.
- **Compra e doação no mesmo formulário** (`OrderModal`, com o elemento nativo `dialog`).
- **Contato por `mailto`.** Funciona sem back-end, mas depende de o computador ter um programa de e-mail configurado.
## Deploy na Vercel
 
O site é publicado na Vercel a cada push no GitHub.
 
1. **`vercel.json`** na raiz, para abrir `/sobre` direto ou apertar F5 não dar erro 404:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
 
2. **`VITE_API_URL`** em Project Settings, Environment Variables, com o endereço do back-end em `https`. Depois de criar ou mudar, publique de novo (a variável é gravada no site durante o build).
3. O back-end precisa estar hospedado, em `https`, com CORS liberado para o endereço do site.
4. **Maiúsculas e minúsculas:** a Vercel roda em Linux. O nome no `import` precisa ser idêntico ao do arquivo, incluindo maiúsculas (por exemplo `ImageProductDarkMode.png`). No Windows o erro só aparece no deploy.
Depois de publicar, teste: abrir `/sobre` direto e apertar F5, digitar um endereço que não existe (deve mostrar a página 404), converter um arquivo pequeno e abrir `/login` no celular.
 
## Convenções para contribuir
 
1. Cada componente fica em uma pasta com o mesmo nome (PascalCase), com o `.jsx` e o `.css` dentro. As classes começam com o nome do componente (`device__title`).
2. Use só variáveis de cor do `index.css`. Use `btn` para botões e `field` para campos.
3. Navega para outra página? Use `Link`. Executa uma ação na mesma página? Use `button`.
4. Imagem decorativa leva `alt=""`. Imagem com informação leva descrição. Botão só com ícone leva `aria-label`.
5. Fotos e imagens entram por `import`, nunca por texto de caminho (quebra depois do build).
6. Mudanças importantes na tela (carregando, erro, sucesso) precisam de aviso em texto (`role="status"` ou `role="alert"`).
7. Antes de enviar ao GitHub: `npm run build` e `npm run lint`, e teste os dois temas e a largura de 320 pixels.
8. Quem altera um arquivo já revisado avisa o grupo.
## Pendências conhecidas
 
- [ ] **Transferência real ao dispositivo por cabo USB** (provavelmente Web Serial, que costuma funcionar só em navegadores baseados em Chromium). Implementar em `transferirParaDispositivo`, em `src/services/converter.js`. Falta combinar com o hardware o formato dos dados.
- [ ] **Login real.** Trocar o modo demonstração por autenticação no back-end (precisa de um endpoint como `GET /auth/eu`) e restringir o Conversor a quem comprou o dispositivo.
- [ ] Alinhar com o back-end onde ocorre a conversão (servidor ou navegador) e se o arquivo enviado é apagado. Atualizar os textos do site e a Política de Privacidade de acordo.
- [ ] Revisar Termos de Uso e Política de Privacidade com orientação jurídica e resolver os marcadores amarelos `[CONFIRMAR]`.
- [ ] Trocar o telefone de exemplo e o link genérico do GitHub no rodapé.
- [ ] Converter imagens grandes para WebP e informar `width` e `height`.
- [ ] Fixar a versão do script do Sienna no `index.html`.
- [ ] Testar acessibilidade com leitor de tela e com usuários reais.
- [ ] Remover componentes e dependências sem uso (`BrailleCell1.jsx`, `FileUploadModal.jsx`, `RolarPraCima.jsx`, `motion`, `split-type`), depois de conferir com a busca do editor.
- [ ] A lista do Conversor some ao trocar de página dentro do site. Guardar o estado acima das páginas resolveria, sem usar o armazenamento do navegador.
## Equipe
 
| Integrante | Funções | Links |
|---|---|---|
| Evandro Silva | Project Owner, Modelagem de Protótipo, Financeiro | [LinkedIn](https://www.linkedin.com/in/evandro-jsilva/) · [GitHub](https://github.com/evandroqzn) |
| Lucas Moreira | Scrum Master, Full-Stack | [LinkedIn](https://www.linkedin.com/in/lucasmns7/) · [GitHub](https://github.com/LucMNS) |
| Maria Eduarda | Front-End, UI/UX Design, Marketing | [LinkedIn](https://www.linkedin.com/in/mariaeduardalimadasilva/) · [GitHub](https://github.com/MariaEduarda907) |
| Giovanna Macedo | Front-End, UI/UX Design, Marketing | [LinkedIn](https://www.linkedin.com/in/giovannamacedo8/) · [GitHub](https://github.com/giimacedo) |
| Letícia Vitória | Front-End, Vendas | [LinkedIn](https://www.linkedin.com/in/let%C3%ADciavitorias/) · [GitHub](https://github.com/leticiavsdev) |
| Victor Leonardo | Back-End, IA | [LinkedIn](https://www.linkedin.com/in/victorleonardoz/) · [GitHub](https://github.com/victorcaito) |
| Guilherme Miranda | Full-Stack | [LinkedIn](https://www.linkedin.com/in/guilhermemiranda0/) · [GitHub](https://github.com/gmm-tech) |
 
## Créditos e transparência
 
- **Bibliotecas:** React, Vite, React Router, react-icons, GSAP e oxlint, cada uma com a licença dos seus autores. Fontes Roboto e Poppins, do Google Fonts. O widget de acessibilidade Sienna é carregado do jsDelivr.
- **Imagens e ícones:** confira a origem e a licença de cada um antes de publicar (por exemplo, os ícones de lua e sol vêm do Icons8, que costuma exigir crédito no plano gratuito).
- **Uso de inteligência artificial:** parte da revisão do código, dos comentários e da documentação deste projeto teve apoio de um assistente de IA (Claude, da Anthropic). O grupo declara esse uso conforme as regras do Instituto Proa, e cada integrante deve saber explicar a parte que apresenta. A documentação detalhada de decisões e componentes está no documento "LiBraille: documentação do front-end".
## Licença
 
Projeto acadêmico. Nenhuma licença de código aberto foi definida pelo grupo; até que isso aconteça, todos os direitos permanecem com os autores.
 