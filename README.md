# libraille-frontend
Interface Web em React + Vite com Simulador Virtual Braille e gestão de leitura.

```
libraille-frontend/
├── public/                      # Ícones, favicon e sons de feedback
├── src/
│   ├── assets/                  # Imagens ilustrativas e logotipo LiBraille
│   │
│   ├── components/              # Peças reutilizáveis de interface
│   │   ├── Navbar.jsx           # Barra de navegação superior acessível
│   │   ├── BrailleCell.jsx      # A célula individual com os 6 pontinhos que acendem
│   │   ├── PlaybackControls.jsx # Botões de Play, Pause, Avançar, Voltar e Slider de Velocidade
│   │   └── FileUploadModal.jsx  # Janela pop-up para arrastar arquivos .txt e .epub
│   │
│   ├── pages/                   # As telas principais da aplicação
│   │   ├── Home.jsx             # Apresentação do projeto e proposta de acessibilidade
│   │   ├── Library.jsx          # Lista dos livros carregados e botão de novo upload
│   │   └── Reader.jsx           # Tela principal: Leitor com o Simulador Virtual
│   │
│   ├── services/                # Comunicação externa
│   │   ├── api.js               # Chamadas Axios/Fetch para o backend FastAPI (porta 8000)
│   │   └── webSerial.js         # Envio dos bytes via cabo USB para o ESP32-C3
│   │
│   ├── utils/                   # Funções auxiliares
│   │   └── brailleUtils.js      # Decodificador de byte (0..63) para estado dos 6 pontos
│   │
│   ├── App.jsx                  # Configuração das rotas (React Router)
│   ├── main.jsx                 # Ponto de inicialização do React
│   └── index.css                # Estilos globais e Tailwind CSS
│
├── .env.example                 # VITE_API_URL=http://localhost:8000
├── package.json
└── vite.config.js
```

## As 3 Páginas Essenciais que o Sistema Deve Ter

Não é necessário criar dezenas de páginas; concentrar os esforços em três telas bem acabadas e acessíveis entrega o valor que a banca procura:

### Tela 1: Apresentação e Boas-Vindas (`Home.jsx`)

- **Objetivo:** Contar a história da solução logo no primeiro slide do Demo Day.

- **O que tem nela:**
    - Chamada principal de impacto (pitch): autonomia de leitura tátil digital.

    - Mini-demonstração interativa: um campo onde qualquer pessoa digita uma palavra e vê imediatamente os pontos Braille correspondentes na tela.

    - Recursos de acessibilidade nativos: botões de alto contraste, aumento de fonte e atalhos de teclado.

###  Tela 2: Biblioteca de Livros (`Library.jsx`)

- **Objetivo**: Onde o usuário gerencia suas leituras e adiciona novos materiais.

- **O que tem nela:**
    - Botão de upload para subir arquivos .txt ou .epub.

    - Cards com os livros já salvos no banco MySQL (ex: Dom Casmurro, O Pequeno Príncipe, Apostila de Python), exibindo título, data e porcentagem lida.

    - Botão direto: "Iniciar Leitura", que redireciona para a tela do simulador.

### Tela 3: O Leitor Interativo (`Reader.jsx`)

- **Objetivo:** Onde a mágica acontece. É a tela que fica projetada no telão do Demo Day enquanto alguém segura o protótipo físico na mão.

- **O que tem nela:**
    - O texto original em destaque: o parágrafo ou frase atual, com a letra ou palavra em leitura grifada em tempo real (como em um karaokê).

    - O Simulador Virtual Braille: a matriz 2x3 gigante que se move junto com o texto.

    - Painel de controle: botões de Play, Pausa, Retroceder, Avançar e um seletor de velocidade de leitura (ex: de 1 a 5 caracteres por segundo).

    - Indicador de conexão do hardware: um botão para conectar o ESP32-C3 via cabo USB (Web Serial API) ou Bluetooth, mostrando se o aparelho físico está sincronizado.