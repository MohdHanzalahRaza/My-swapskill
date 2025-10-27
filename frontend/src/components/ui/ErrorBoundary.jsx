import { Component } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-error-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Oops! Something went wrong
                </h2>
                <p className="text-gray-600 mb-6">
                  We're sorry for the inconvenience. An unexpected error occurred.
                </p>
                
                {process.env.NODE_ENV === 'development' && (
                  <details className="text-left bg-gray-100 p-4 rounded-lg mb-6">
                    <summary className="cursor-pointer text-sm font-medium text-gray-700 mb-2">
                      Error Details (Development Only)
                    </summary>
                    <div className="text-xs text-gray-600 font-mono">
                      <div className="mb-2">
                        <strong>Error:</strong> {this.state.error && this.state.error.toString()}
                      </div>
                      <div>
                        <strong>Stack Trace:</strong>
                        <pre className="whitespace-pre-wrap mt-1">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    </div>
                  </details>
                )}
                
                <div className="space-y-3">
                  <button
                    onClick={this.handleReload}
                    className="w-full btn-primary"
                  >
                    Reload Page
                  </button>
                  <button
                    onClick={this.handleGoHome}
                    className="w-full btn-outline"
                  >
                    Go to Homepage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    // If no error, render children normally
    return this.props.children
  }
}

export default ErrorBoundary