import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: Number(process.env.VITE_PORT) || 5173,
    },
    resolve: {
        alias: {
            '@app': resolve(process.cwd(), 'src/app'),
            '@processes': resolve(process.cwd(), 'src/processes'),
            '@pages': resolve(process.cwd(), 'src/pages'),
            '@widgets': resolve(process.cwd(), 'src/widgets'),
            '@features': resolve(process.cwd(), 'src/features'),
            '@entities': resolve(process.cwd(), 'src/entities'),
            '@shared': resolve(process.cwd(), 'src/shared'),
        },
    },
})
