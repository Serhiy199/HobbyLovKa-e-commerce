"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CookieIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const AGE_GATE_STORAGE_KEY = "voodoo-vape-age-confirmed";
const AGE_GATE_SESSION_KEY = "voodoo-vape-age-session";
const AGE_GATE_COOKIE_KEY = "voodoo_vape_age_confirmed";
const COOKIE_CONFIRM_STORAGE_KEY = "voodoo-vape-cookie-confirmed";
const COOKIE_CONFIRM_SESSION_KEY = "voodoo-vape-cookie-session";
const COOKIE_CONFIRM_COOKIE_KEY = "voodoo_vape_cookie_confirmed";
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

function getCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

function setConsentCookie(name: string) {
  document.cookie = `${name}=true; Max-Age=${ONE_YEAR_IN_SECONDS}; Path=/; SameSite=Lax`;
}

function hasAgeConfirmation() {
  return (
    window.localStorage.getItem(AGE_GATE_STORAGE_KEY) === "true" ||
    window.sessionStorage.getItem(AGE_GATE_SESSION_KEY) === "true" ||
    getCookie(AGE_GATE_COOKIE_KEY) === "true"
  );
}

function hasCookieConfirmation() {
  return (
    window.localStorage.getItem(COOKIE_CONFIRM_STORAGE_KEY) === "true" ||
    window.sessionStorage.getItem(COOKIE_CONFIRM_SESSION_KEY) === "true" ||
    getCookie(COOKIE_CONFIRM_COOKIE_KEY) === "true"
  );
}

export function CookieConfirm() {
  const [isReady, setIsReady] = useState(false);
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(true);

  useEffect(() => {
    const syncState = () => {
      setIsAgeConfirmed(hasAgeConfirmation());
      setIsConfirmed(hasCookieConfirmation());
      setIsReady(true);
    };

    const timeoutId = window.setTimeout(syncState, 0);
    window.addEventListener("voodoo-vape-age-confirmed", syncState);
    window.addEventListener("storage", syncState);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("voodoo-vape-age-confirmed", syncState);
      window.removeEventListener("storage", syncState);
    };
  }, []);

  if (!isReady || !isAgeConfirmed || isConfirmed) {
    return null;
  }

  const confirmCookieNotice = () => {
    window.localStorage.setItem(COOKIE_CONFIRM_STORAGE_KEY, "true");
    window.sessionStorage.setItem(COOKIE_CONFIRM_SESSION_KEY, "true");
    setConsentCookie(COOKIE_CONFIRM_COOKIE_KEY);
    setIsConfirmed(true);
  };

  return (
    <div
      aria-describedby="cookie-confirm-description"
      aria-labelledby="cookie-confirm-title"
      role="dialog"
      className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-screen-md rounded-xl border border-border bg-card p-4 shadow-2xl sm:left-auto sm:max-w-md"
    >
      <div className="flex gap-3">
        <span className="hidden size-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary sm:grid">
          <CookieIcon className="size-5" />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <h2 id="cookie-confirm-title" className="text-sm font-semibold">
            Cookie та сесійні дані
          </h2>
          <p id="cookie-confirm-description" className="text-muted-foreground text-sm leading-5">
            Ми зберігаємо підтвердження віку, cookie notice і базові сесійні
            налаштування для коректної роботи магазину. Детальніше у{" "}
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
          onClick={confirmCookieNotice}
        >
          <XIcon className="size-4" />
        </Button>
      </div>
      <Button className="mt-4 h-10 w-full rounded-lg" onClick={confirmCookieNotice}>
        Зрозуміло
      </Button>
    </div>
  );
}
