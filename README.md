# libraille-frontend
Interface Web em React + Vite com Simulador Virtual Braille e gestão de leitura.

```
libraille-web/
├── src/
│   ├── assets/             # Imagens, logotipos
│   ├── components/
│   │   ├── BrailleCell.jsx # Representação dos 6 pontos que acendem
│   │   ├── ReaderDisplay.jsx
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── Reader.jsx      # Página com o simulador virtual braille
│   ├── services/
│   │   └── api.js          # Chamadas fetch/axios para o backend
│   ├── App.jsx
│   └── main.jsx
├── .env.example            # VITE_API_URL=http://localhost:8000
├── package.json
├── .gitignore
└── README.md
```