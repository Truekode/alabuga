import { useEdges } from '@shared/api'

export function HomePage() {
    const {
        data,
        error,
        isLoading,
        refetch
    } = useEdges()
    return (
        <div>
            <div>Home</div>
            <button onClick={() => refetch()}>Load Edges</button>
            {isLoading && <div>Loading...</div>}
            {error && <pre style={{color: 'red'}}>{(error as Error).message}</pre>}
            {data && <pre>{JSON.stringify(data)}</pre>}
        </div>
    )
}
