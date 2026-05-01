"use client";

import Link from "next/link";
import { MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon } from "lucide-react";

import { StorefrontLogo } from "@/components/storefront/storefront-logo";
import {
  storefrontCategories,
  storefrontInfoLinks,
  storefrontMainNavigation,
} from "@/components/storefront/storefront-config";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function StorefrontMobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label="Відкрити меню магазину"
          />
        }
      >
        <MenuIcon className="size-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm overflow-y-auto p-0">
        <SheetHeader className="border-b border-border/70 px-5 py-4 text-left">
          <StorefrontLogo compact />
          <SheetTitle className="sr-only">Мобільне меню магазину</SheetTitle>
          <SheetDescription>
            Каталог, пошук, кабінет і кошик в одному швидкому меню.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 px-5 py-5">
          <label className="relative block">
            <SearchIcon className="text-muted-foreground pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" />
            <Input
              className="h-11 rounded-lg bg-background pl-10"
              placeholder="Пошук товару"
              type="search"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/account"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
            >
              <UserIcon className="size-4" />
              Кабінет
            </Link>
            <Link href="/cart" className={cn(buttonVariants(), "gap-2")}>
              <ShoppingBagIcon className="size-4" />
              Кошик
            </Link>
          </div>

          <Separator />

          <nav className="grid gap-2" aria-label="Основна навігація">
            {storefrontMainNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg border border-border/70 bg-background px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Separator />

          <nav className="space-y-4" aria-label="Мобільний каталог">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-[0.22em]">
              Каталог
            </p>
            {storefrontCategories.map((category) => (
              <div key={category.href} className="space-y-2">
                <Link href={category.href} className="font-medium">
                  {category.label}
                </Link>
                <div className="grid gap-2 pl-3">
                  {category.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground text-sm"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          <Separator />

          <nav className="grid gap-2" aria-label="Інформаційні сторінки">
            {storefrontInfoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
