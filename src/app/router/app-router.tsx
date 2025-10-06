import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Spinner } from '@shared/ui/status'
import { AppLayout } from '@app/ui/AppLayout'

const EdgesPage = lazy(() => import('@pages/edges').then((m) => ({default: m.EdgesPage})))
const CurrentsPage = lazy(() => import('@pages/edges').then((m) => ({default: m.CurrentsPage})))
const HistoriesPage = lazy(() => import('@pages/edges').then((m) => ({default: m.HistoriesPage})))
const NormalizePage = lazy(() => import('@pages/tests').then((m) => ({default: m.NormalizePage})))

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        index: true,
        element: (
            <Suspense fallback={<Spinner center/>}>
              <EdgesPage/>
            </Suspense>
        ),
      },
      {
        path: '/edges',
        element: (
            <Suspense fallback={<Spinner center/>}>
              <EdgesPage/>
            </Suspense>
        ),
      },
      {
        path: '/edges/:id/currents',
        element: (
            <Suspense fallback={<Spinner center/>}>
              <CurrentsPage/>
            </Suspense>
        ),
      },
      {
        path: '/edges/:id/histories',
        element: (
            <Suspense fallback={<Spinner center/>}>
              <HistoriesPage/>
            </Suspense>
        ),
      },
      {
        path: '/tests/normalize',
        element: (
            <Suspense fallback={<Spinner center/>}>
              <NormalizePage/>
            </Suspense>
        ),
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router}/>
}
