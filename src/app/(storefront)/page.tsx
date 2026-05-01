import Link from "next/link";
import {
  ArrowRightIcon,
  BadgeCheckIcon,
  SearchIcon,
  ShoppingBagIcon,
} from "lucide-react";

import { StorefrontCategoryCard } from "@/components/storefront/category-card";
import { StorefrontProductGrid } from "@/components/storefront/product-grid";
import {
  storefrontCategories,
  storefrontFeaturedProducts,
  storefrontHomePromos,
} from "@/components/storefront/storefront-config";
import {
  StorefrontActionLink,
  StorefrontBadge,
  StorefrontCard,
  StorefrontGrid,
  StorefrontSection,
  StorefrontSectionHeader,
  storefrontPatterns,
} from "@/components/storefront/storefront-primitives";
import { Input } from "@/components/ui/input";

const popularSearches = [
  "POD-системи",
  "Картриджі",
  "Сольові рідини",
  "Vaporesso",
  "Oxva",
  "Випарники",
];

const merchandisingBlocks = [
  {
    description: "Добірки new, sale та hit будуть наповнюватися товарами з адмінки на наступному кроці.",
    href: "/catalog?flag=hit",
    label: "Популярні товари",
  },
  {
    description: "Окрема зона для акційних товарів, промокодів і бонусних пропозицій.",
    href: "/sale",
    label: "Акції та кешбек",
  },
  {
    description: "Швидкий шлях для клієнта, який вже знає бренд або сумісну модель комплектуючих.",
    href: "/catalog?sort=brands",
    label: "Пошук за брендом",
  },
];

export default function StorefrontHomePage() {
  return (
    <>
      <StorefrontSection spacing="lg" className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div className="max-w-4xl space-y-7">
            <div className="flex flex-wrap gap-2">
              <StorefrontBadge tone="default">18+ storefront</StorefrontBadge>
              <StorefrontBadge tone="hit">Швидкий вибір</StorefrontBadge>
            </div>

            <div className="space-y-4">
              <p className={storefrontPatterns.eyebrow}>Voodoo Vape</p>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Зручний vape-магазин з фокусом на каталог, пошук і швидкий вибір.
              </h1>
              <p className="text-muted-foreground max-w-2xl text-base leading-7 sm:text-lg">
                Обирайте пристрої, рідини, комплектуючі та аксесуари через зрозумілі
                категорії, швидкий пошук і добірки для популярних сценаріїв.
              </p>
            </div>

            <div className="max-w-2xl rounded-xl border border-border/70 bg-card p-2 shadow-sm">
              <label className="relative block">
                <SearchIcon className="text-muted-foreground pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  className="h-12 rounded-lg border-0 bg-background pl-11 pr-4 shadow-none"
                  placeholder="Почніть вводити назву товару"
                  type="search"
                />
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {popularSearches.map((item) => (
                <Link
                  key={item}
                  href={`/catalog?search=${encodeURIComponent(item)}`}
                  className="text-muted-foreground rounded-full border border-border bg-card px-3 py-1.5 text-sm transition hover:border-primary/40 hover:text-foreground"
                >
                  {item}
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <StorefrontActionLink href="/catalog">
                Перейти в каталог
                <ArrowRightIcon className="size-4" />
              </StorefrontActionLink>
              <StorefrontActionLink href="/category" variant="outline">
                Дивитись категорії
              </StorefrontActionLink>
            </div>
          </div>

          <StorefrontCard className="relative min-h-[360px] p-5">
            <div className="absolute inset-x-5 top-5 flex items-center justify-between">
              <StorefrontBadge tone="stock">Вітрина</StorefrontBadge>
              <span className="text-muted-foreground text-xs">18+</span>
            </div>
            <div className="grid h-full place-items-center pt-12">
              <div className="w-full max-w-xs space-y-4">
                {storefrontHomePromos.map((promo) => {
                  const Icon = promo.icon;

                  return (
                    <Link
                      key={promo.href}
                      href={promo.href}
                      className="group flex gap-4 rounded-lg border border-border/70 bg-background p-4 transition hover:border-primary/40 hover:shadow-sm"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="space-y-1">
                        <span className="block font-medium">{promo.label}</span>
                        <span className="text-muted-foreground block text-sm leading-5">
                          {promo.description}
                        </span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </StorefrontCard>
        </div>
      </StorefrontSection>

      <StorefrontSection tone="muted">
        <StorefrontSectionHeader
          eyebrow="Категорії"
          title="Основні напрямки магазину"
          description="Категорії побудовані так, щоб клієнт швидко знайшов потрібний тип товару, а потім перейшов до підкатегорій і фільтрів."
          action={
            <StorefrontActionLink href="/category" variant="outline" size="default">
              Усі категорії
            </StorefrontActionLink>
          }
        />
        <StorefrontGrid variant="categories">
          {storefrontCategories.map((category) => (
            <StorefrontCategoryCard key={category.href} category={category} />
          ))}
        </StorefrontGrid>
      </StorefrontSection>

      <StorefrontSection>
        <StorefrontSectionHeader
          eyebrow="Товарна вітрина"
          title="Популярні товари"
          description="Базова картка товару вже підтримує badges, бренд, рейтинг, наявність, ціну та кнопку додавання в кошик як UI-placeholder."
          action={
            <StorefrontActionLink href="/catalog" variant="outline" size="default">
              Весь каталог
            </StorefrontActionLink>
          }
        />
        <StorefrontProductGrid products={storefrontFeaturedProducts} />
      </StorefrontSection>

      <StorefrontSection tone="muted">
        <StorefrontSectionHeader
          eyebrow="Магазинна логіка"
          title="Блоки, які ведуть клієнта до покупки"
          description="Добірки, акції, бренди й швидкі сценарії вибору допомагають швидше перейти від потреби до потрібного товару."
        />
        <StorefrontGrid variant="content">
          {merchandisingBlocks.map((block) => (
            <StorefrontCard key={block.href} interactive className="p-5">
              <Link href={block.href} className="flex h-full flex-col gap-5">
                <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <ShoppingBagIcon className="size-5" />
                </span>
                <span className="space-y-2">
                  <span className="block text-xl font-semibold tracking-tight">
                    {block.label}
                  </span>
                  <span className={storefrontPatterns.bodyText}>
                    {block.description}
                  </span>
                </span>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Переглянути
                  <ArrowRightIcon className="size-4" />
                </span>
              </Link>
            </StorefrontCard>
          ))}
        </StorefrontGrid>
      </StorefrontSection>

      <StorefrontSection tone="dark">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="space-y-3">
            <p className="text-background/70 text-xs font-semibold uppercase tracking-[0.22em]">
              Підбір товару
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              Знайдіть потрібну категорію та переходьте до каталогу.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-background/75 sm:text-base">
              Каталог об’єднає товари, фільтри, характеристики й добірки, щоб вибір
              пристрою або рідини був швидким і зрозумілим.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <BadgeCheckIcon className="size-5 text-primary" />
            <span className="text-sm text-background/80">
              Категорії та пошук завжди поруч
            </span>
          </div>
        </div>
      </StorefrontSection>
    </>
  );
}
