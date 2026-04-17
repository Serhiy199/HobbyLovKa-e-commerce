export default function StorefrontHomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16">
      <div className="max-w-3xl space-y-6 rounded-3xl border border-border/70 bg-card/90 p-10 shadow-sm backdrop-blur">
        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
          Voodoo Vape
        </p>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Технічний bootstrap готовий для storefront і admin частини.
          </h1>
          <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            App Router, Tailwind, alias paths, Prisma/Auth-заготовки та базова архітектура
            вже зібрані, щоб наступні feature-и додавались у стабільний каркас.
          </p>
        </div>
      </div>
    </main>
  );
}
