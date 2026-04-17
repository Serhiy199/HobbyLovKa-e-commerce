export default function AdminHomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
      <section className="max-w-2xl space-y-4 rounded-3xl border border-border/70 bg-card p-10 shadow-sm">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
          Admin
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Панель адміністратора</h1>
        <p className="text-muted-foreground">
          Стартова сторінка для майбутніх модулів категорій, товарів, замовлень і SEO.
        </p>
      </section>
    </main>
  );
}
