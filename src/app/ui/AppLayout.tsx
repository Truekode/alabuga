import { Outlet } from 'react-router-dom'
import { getEnv } from '@shared/config/env'
import { EdgeSidebar } from '@widgets/edge-sidebar'
import { Root, Header, Body, Aside, Main } from './style'
import { ErrorBoundary } from '@shared/ui/status'

export function AppLayout() {
    const {VITE_APP_NAME} = getEnv()

    return (
        <Root>
            <Header>{VITE_APP_NAME}</Header>
            <Body>
                <Aside>
                    <EdgeSidebar/>
                </Aside>
                <Main>
                    <ErrorBoundary>
                        <Outlet/>
                    </ErrorBoundary>
                </Main>
            </Body>
        </Root>
    )
}
