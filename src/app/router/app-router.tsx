import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { EdgesPage, CurrentsPage, HistoriesPage } from '@pages/edges'
import { NormalizePage } from '@pages/tests'
import { AppLayout } from '@app/ui/AppLayout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: '/edges',
                element: <EdgesPage/>
            },
            {
                path: '/edges/:id/currents',
                element: <CurrentsPage/>
            },
            {
                path: '/edges/:id/histories',
                element: <HistoriesPage/>
            },
            {
                path: '/tests/normalize',
                element: <NormalizePage/>
            },
        ],
    },
])

export function AppRouter() {
    return <RouterProvider router={router}/>
}
