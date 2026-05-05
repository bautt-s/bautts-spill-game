import React from 'react'

type State = { hasError: boolean }

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
    state: State = { hasError: false }

    static getDerivedStateFromError(): State {
        return { hasError: true }
    }

    componentDidCatch(error: Error) {
        console.error('Game crashed:', error)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-[#555555] text-white p-6">
                    <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
                    <p className="mb-4">The game hit an unexpected error.</p>
                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="bg-[#01D1B3] hover:bg-[#3bbda9] text-white px-4 py-2 rounded-md font-semibold"
                    >
                        Reload
                    </button>
                </div>
            )
        }
        return this.props.children
    }
}

export default ErrorBoundary
