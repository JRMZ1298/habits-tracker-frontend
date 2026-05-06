import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-canvas p-6">
          <div className="max-w-md w-full bg-canvas-parchment rounded-[18px] p-8 text-center space-y-4">
            <span className="material-symbols-outlined text-6xl text-destructive">
              error
            </span>
            <h2 className="text-2xl font-bold text-ink">
              Algo salió mal
            </h2>
            <p className="text-ink-muted-48">
              {this.state.error?.message || "Ha ocurrido un error inesperado"}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-6 py-3 bg-primary text-on-primary rounded-full hover:opacity-90 transition-opacity"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
