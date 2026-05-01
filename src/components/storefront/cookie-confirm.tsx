"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const COOKIE_CONFIRM_KEY = "voodoo-vape-cookie-confirmed";

export function CookieConfirm() {
  const [isReady, setIsReady] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const storedValue = window.localStorage.getItem(COOKIE_CONFIRM_KEY);

      setIsConfirmed(storedValue === "true");
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  if (!isReady || isConfirmed) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-screen-md rounded-xl border border-border bg-card p-4 shadow-2xl sm:left-auto sm:max-w-md">
      <div className="flex gap-3">
        <div className="min-w-0 flex-1 space-y-1">
          <h2 className="text-sm font-semibold">Cookie та session confirm</h2>
          <p className="text-muted-foreground text-sm leading-5">
            Ми використовуємо локальне збереження для підтвердження віку, сесії
            та майбутніх зручностей магазину. Деталі будуть у{" "}
            <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
              політиці конфіденційності
            </Link>
            .
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 rounded-lg"
          aria-label="Закрити повідомлення про cookie"
          onClick={() => {
            window.localStorage.setItem(COOKIE_CONFIRM_KEY, "true");
            setIsConfirmed(true);
          }}
        >
          <XIcon className="size-4" />
        </Button>
      </div>
      <Button
        className="mt-4 h-10 w-full rounded-lg"
        onClick={() => {
          window.localStorage.setItem(COOKIE_CONFIRM_KEY, "true");
          setIsConfirmed(true);
        }}
      >
        Зрозуміло
      </Button>
    </div>
  );
}
