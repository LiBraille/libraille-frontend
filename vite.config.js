import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Endereço do backend em Python (FastAPI) rodando no seu computador.
// Usamos 127.0.0.1 e não "localhost": em versões novas do Node, "localhost" pode
// apontar para outro endereço e a conexão com o uvicorn falha.
const BACKEND = 'http://127.0.0.1:8000'

export default defineConfig({
    plugins: [react()],
    server: {
        // O proxy faz o navegador achar que o site e o backend estão no mesmo endereço.
        // Assim não há problema de CORS durante o desenvolvimento.
        proxy: {
            '/pedidos': BACKEND,
            '/auth': BACKEND,
            '/traduzir': BACKEND,
        },
    },
})