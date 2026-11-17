import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/pedidos': 'http://localhost:8000',   // porta do backend Python
            '/auth': 'http://localhost:8000',
        },
    },
})

// IMPORTANTE
//