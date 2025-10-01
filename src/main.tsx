import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppProviders, AppRouter } from '@app'
import { getEnv } from '@shared/config/env'

const root = createRoot(document.getElementById('root')!)

function renderError(message: string) {
    root.render(<div style={{
        padding: 16,
        fontFamily: 'sans-serif',
        color: 'red'
    }}>{message}</div>)
}

try {
    getEnv()
    root.render(
        <StrictMode>
            <AppProviders>
                <AppRouter/>
            </AppProviders>
        </StrictMode>
    )
} catch (e) {
    const msg = (e as { message?: string }).message || 'App initialization error'
    renderError(msg)
}
