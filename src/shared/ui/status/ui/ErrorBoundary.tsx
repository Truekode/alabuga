import { Component, type ReactNode } from 'react'
import { ErrorBanner } from './ErrorBanner'

interface IProps {
    children: ReactNode
}

interface IState {
    error: Error | null
}

export class ErrorBoundary extends Component<IProps, IState> {
    state: IState = {error: null}

    static getDerivedStateFromError(error: Error): IState {
        return {error}
    }

    reset = () => {
        this.setState({error: null})
    }

    render() {
        const {error} = this.state
        if (error) {
            return <ErrorBanner message={error.message} onRetry={this.reset}/>
        }
        return this.props.children
    }
}
