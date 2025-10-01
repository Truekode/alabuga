import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, theme } from '@shared/styles/tokens'

interface IAppProvidersProps {
    children: ReactNode
}

export function AppProviders({children}: IAppProvidersProps) {
    const [queryClient] = useState(() => new QueryClient())
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                {children}
                <ReactQueryDevtools initialIsOpen={false}/>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
