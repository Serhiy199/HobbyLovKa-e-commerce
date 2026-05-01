"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

const AGE_GATE_KEY = "voodoo-vape-age-confirmed";

export function AgeGate() {
  const [isReady, setIsReady] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedValue = window.localStorage.getItem(AGE_GATE_KEY);

      setIsConfirmed(storedValue === "true");
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!isReady || isConfirmed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/80 px-4 backdrop-blur-md">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 text-center shadow-2xl">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.24em]">
          Підтвердження віку
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight">
          Вам вже є 18 років?
        </h2>
        <p className="text-muted-foreground mt-3 text-sm leading-6">
          Voodoo Vape призначений лише для повнолітніх користувачів. Підтвердіть
          вік, щоб переглядати каталог магазину.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Button
            className="h-11 rounded-lg"
            onClick={() => {
              window.localStorage.setItem(AGE_GATE_KEY, "true");
              setIsConfirmed(true);
            }}
          >
            Так, мені є 18+
          </Button>
          <Button
            className="h-11 rounded-lg"
            variant="outline"
            onClick={() => {
              window.location.href = "https://www.google.com/";
            }}
          >
            Ні, вийти
          </Button>
        </div>
      </div>
    </div>
  );
}
