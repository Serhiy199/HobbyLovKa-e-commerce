export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-md space-y-3 rounded-3xl border border-border/70 bg-card p-10 text-center shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">Сторінку не знайдено</h1>
        <p className="text-muted-foreground">
          Базовий маршрут працює, але цього сегмента ще немає у Phase 1.
        </p>
      </div>
    </main>
  );
}
