import { HeartIcon, ShieldCheckIcon, ShoppingCartIcon, TruckIcon } from "lucide-react";

import type { StorefrontProductCardItem } from "@/components/storefront/product-types";
import { currencyFormatter } from "@/components/storefront/product-card";
import {
  StorefrontBadge,
  StorefrontCard,
} from "@/components/storefront/storefront-primitives";
import { Button } from "@/components/ui/button";

export function StorefrontProductPurchasePanel({
  product,
}: {
  product: StorefrontProductCardItem;
}) {
  const isAvailable = product.availability === "in_stock";

  return (
    <StorefrontCard className="p-5 lg:sticky lg:top-40">
      <div className="space-y-5">
        <div className="flex flex-wrap gap-2">
          {product.badges?.map((badge) => (
            <StorefrontBadge
              key={badge}
              tone={badge === "sale" ? "sale" : badge === "hit" ? "hit" : "new"}
            >
              {badge === "sale" ? "Акція" : badge === "hit" ? "Топ" : "Новинка"}
            </StorefrontBadge>
          ))}
          <StorefrontBadge tone={isAvailable ? "stock" : "muted"}>
            {isAvailable ? "В наявності" : "Немає в наявності"}
          </StorefrontBadge>
        </div>

        <div className="space-y-1">
          {product.brand ? (
            <p className="text-muted-foreground text-sm">Бренд: {product.brand}</p>
          ) : null}
          <p className="text-3xl font-semibold tracking-tight">
            {currencyFormatter.format(product.price)}
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-[1fr_auto] lg:grid-cols-1 xl:grid-cols-[1fr_auto]">
          <Button className="h-12 rounded-lg gap-2" disabled={!isAvailable}>
            <ShoppingCartIcon className="size-5" />
            {isAvailable ? "До кошика" : "Товар недоступний"}
          </Button>
          <Button variant="outline" size="icon" className="h-12 w-full rounded-lg sm:w-12 lg:w-full xl:w-12">
            <HeartIcon className="size-5" />
            <span className="sr-only">Додати в обране</span>
          </Button>
        </div>

        <div className="grid gap-3 rounded-lg border border-border/70 bg-background p-4 text-sm">
          <span className="inline-flex gap-3">
            <TruckIcon className="text-primary size-5 shrink-0" />
            <span>
              <strong className="block">Доставка по Україні</strong>
              <span className="text-muted-foreground">
                Детальні умови будуть підключені на checkout етапі.
              </span>
            </span>
          </span>
          <span className="inline-flex gap-3">
            <ShieldCheckIcon className="text-primary size-5 shrink-0" />
            <span>
              <strong className="block">Перевірений товар</strong>
              <span className="text-muted-foreground">
                Дані товару керуються з адмін-панелі.
              </span>
            </span>
          </span>
        </div>
      </div>
    </StorefrontCard>
  );
}
