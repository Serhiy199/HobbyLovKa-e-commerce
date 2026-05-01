import Link from "next/link";
import {
  ChevronDownIcon,
  ClockIcon,
  HeartIcon,
  PhoneIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
} from "lucide-react";

import { StorefrontMobileMenu } from "@/components/storefront/mobile-menu";
import {
  storefrontCategories,
  storefrontInfoLinks,
} from "@/components/storefront/storefront-config";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function StorefrontHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-xl">
      <div className="border-b border-border/60 bg-foreground text-background">
        <div className="mx-auto flex h-9 w-full max-w-screen-2xl items-center justify-between gap-4 px-4 text-xs sm:px-6 lg:px-8">
          <div className="hidden items-center gap-4 md:flex">
            <span className="inline-flex items-center gap-2">
              <ClockIcon className="size-3.5" />
              Пн-Нд: 10:00-20:00
            </span>
            <span className="inline-flex items-center gap-2">
              <PhoneIcon className="size-3.5" />
              +38 (080) 033-50-94
            </span>
          </div>
          <p className="truncate">
            Сайт призначений виключно для осіб віком 18+
          </p>
          <nav className="hidden items-center gap-4 lg:flex" aria-label="Корисні посилання">
            {storefrontInfoLinks.slice(0, 4).map((link) => (
              <Link key={link.href} href={link.href} className="opacity-85 hover:opacity-100">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <StorefrontMobileMenu />

        <Link href="/" className="group flex min-w-fit items-center gap-3">
          <span className="grid size-11 place-items-center rounded-lg bg-foreground text-lg font-semibold text-background shadow-sm transition group-hover:bg-primary">
            VV
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-lg font-semibold tracking-tight">
              Voodoo Vape
            </span>
            <span className="text-muted-foreground block text-xs">
              vape shop та аксесуари
            </span>
          </span>
        </Link>

        <Link
          href="/catalog"
          className={cn(
            buttonVariants({ variant: "default" }),
            "hidden h-11 shrink-0 gap-2 rounded-lg px-4 lg:inline-flex",
          )}
        >
          Каталог товарів
          <ChevronDownIcon className="size-4" />
        </Link>

        <div className="hidden min-w-0 flex-1 lg:block">
          <label className="relative block">
            <SearchIcon className="text-muted-foreground pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2" />
            <Input
              className="h-11 rounded-lg border-border/80 bg-card pl-11 pr-28 shadow-sm"
              placeholder="Почніть вводити назву товару"
              type="search"
            />
            <span className="text-muted-foreground absolute right-4 top-1/2 -translate-y-1/2 text-xs">
              Часто шукають: pod
            </span>
          </label>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/wishlist"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "hidden rounded-lg bg-card sm:inline-flex",
            )}
            aria-label="Обране"
          >
            <HeartIcon className="size-4" />
          </Link>
          <Link
            href="/account"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "hidden rounded-lg bg-card sm:inline-flex",
            )}
            aria-label="Особистий кабінет"
          >
            <UserIcon className="size-4" />
          </Link>
          <Link
            href="/cart"
            className={cn(
              buttonVariants({ variant: "default" }),
              "relative h-11 gap-2 rounded-lg px-3 sm:px-4",
            )}
          >
            <ShoppingBagIcon className="size-4" />
            <span className="hidden sm:inline">0 грн.</span>
            <Badge className="absolute -right-2 -top-2 grid size-5 place-items-center rounded-full p-0 text-[10px]">
              0
            </Badge>
          </Link>
        </div>
      </div>

      <nav
        className="hidden border-t border-border/60 bg-card/80 lg:block"
        aria-label="Основні категорії"
      >
        <div className="mx-auto flex w-full max-w-screen-2xl items-center gap-1 px-4 sm:px-6 lg:px-8">
          {storefrontCategories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="text-muted-foreground hover:text-foreground border-b-2 border-transparent px-4 py-3 text-sm font-medium transition hover:border-primary"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
