export const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-canvas">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/20 animate-bounce" />
      <p className="text-ink-muted-48 text-sm">Cargando...</p>
    </div>
  </div>
);
