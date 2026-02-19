import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Render error caught by ErrorBoundary', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-[#F7F4F1] text-[#2D2A26]">
          <div className="max-w-xl text-center">
            <h1 className="text-3xl md:text-4xl mb-4">Unable to load this page section.</h1>
            <p className="text-[#6B6661]">
              Please refresh once. If it still fails, disable hardware acceleration for this browser tab and retry.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
