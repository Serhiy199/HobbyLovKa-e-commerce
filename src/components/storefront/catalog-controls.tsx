"use client";

import Link from "next/link";
import { CheckIcon, SlidersHorizontalIcon, XIcon } from "lucide-react";

import { StorefrontSearchForm } from "@/components/storefront/storefront-search-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  catalogAvailabilityOptions,
  catalogBadgeOptions,
  catalogBrandOptions,
  catalogPriceRangeOptions,
  catalogSortOptions,
  hasActiveCatalogFilters,
  type CatalogFilterState,
} from "@/lib/storefront/catalog-filters";
import { cn } from "@/lib/utils";

type CatalogControlsProps = {
  basePath: string;
  count: number;
  filters: CatalogFilterState;
  title?: string;
};

type FilterParamKey = "availability" | "badge" | "brand" | "price" | "search" | "sort";

const paramNameByFilter = {
  availability: "availability",
  badge: "badge",
  brandSlug: "brand",
  priceRange: "price",
  search: "search",
  sort: "sort",
} as const;

const filterGroups = [
  {
    key: "availability",
    label: "Наявність",
    options: catalogAvailabilityOptions,
  },
  {
    key: "badge",
    label: "Добірка",
    options: catalogBadgeOptions,
  },
  {
    key: "priceRange",
    label: "Ціна",
    options: catalogPriceRangeOptions,
  },
  {
    key: "brandSlug",
    label: "Бренд",
    options: catalogBrandOptions,
  },
] as const;

function filtersToParams(filters: CatalogFilterState) {
  const params = new URLSearchParams();

  Object.entries(paramNameByFilter).forEach(([filterKey, paramKey]) => {
    const value = filters[filterKey as keyof CatalogFilterState];

    if (value) {
      params.set(paramKey, value);
    }
  });

  return params;
}

function createCatalogHref(
  basePath: string,
  filters: CatalogFilterState,
  updates: Partial<Record<FilterParamKey, string | undefined>>,
) {
  const params = filtersToParams(filters);

  Object.entries(updates).forEach(([key, value]) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
  });

  const query = params.toString();

  return query ? `${basePath}?${query}` : basePath;
}

function getActiveValue(
  filters: CatalogFilterState,
  key: (typeof filterGroups)[number]["key"],
) {
  return filters[key];
}

function optionHref(
  basePath: string,
  filters: CatalogFilterState,
  key: (typeof filterGroups)[number]["key"],
  value: string,
) {
  const paramKey = paramNameByFilter[key];
  const isActive = getActiveValue(filters, key) === value;

  return createCatalogHref(basePath, filters, {
    [paramKey]: isActive ? undefined : value,
  });
}

function selectedFilterLabels(filters: CatalogFilterState) {
  const labels: Array<{
    key: FilterParamKey;
    label: string;
  }> = [];

  if (filters.search) {
    labels.push({ key: "search", label: `Пошук: ${filters.search}` });
  }

  if (filters.availability) {
    labels.push({
      key: "availability",
      label:
        catalogAvailabilityOptions.find((option) => option.value === filters.availability)
          ?.label ?? filters.availability,
    });
  }

  if (filters.badge) {
    labels.push({
      key: "badge",
      label:
        catalogBadgeOptions.find((option) => option.value === filters.badge)?.label ??
        filters.badge,
    });
  }

  if (filters.priceRange) {
    labels.push({
      key: "price",
      label:
        catalogPriceRangeOptions.find((option) => option.value === filters.priceRange)
          ?.label ?? filters.priceRange,
    });
  }

  if (filters.brandSlug) {
    labels.push({
      key: "brand",
      label:
        catalogBrandOptions.find((option) => option.value === filters.brandSlug)?.label ??
        filters.brandSlug,
    });
  }

  if (filters.sort) {
    labels.push({
      key: "sort",
      label:
        catalogSortOptions.find((option) => option.value === filters.sort)?.label ??
        filters.sort,
    });
  }

  return labels;
}

export function CatalogToolbar({
  basePath,
  count,
  filters,
  title = "Товари",
}: CatalogControlsProps) {
  const activeLabels = selectedFilterLabels(filters);

  return (
    <div className="mb-5 space-y-3 rounded-lg border border-border/70 bg-card p-3 shadow-sm">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-muted-foreground text-sm">
            {count} товарів у добірці
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <StorefrontSearchForm
            action={basePath}
            className="min-w-0 sm:w-80"
            defaultValue={filters.search}
            hiddenParams={{
              availability: filters.availability,
              badge: filters.badge,
              brand: filters.brandSlug,
              price: filters.priceRange,
              sort: filters.sort,
            }}
            placeholder="Пошук у каталозі"
            submitLabel="OK"
          />
          <div className="flex flex-wrap gap-2">
            <MobileFiltersButton basePath={basePath} filters={filters} />
            <SortLink basePath={basePath} filters={filters} />
          </div>
        </div>
      </div>

      {activeLabels.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 border-t border-border/70 pt-3">
          {activeLabels.map((item) => (
            <Link
              key={`${item.key}-${item.label}`}
              href={createCatalogHref(basePath, filters, { [item.key]: undefined })}
              className="inline-flex h-8 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 text-xs font-medium text-primary transition hover:bg-primary/15"
            >
              {item.label}
              <XIcon className="size-3" />
            </Link>
          ))}
          <Link
            href={basePath}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "h-8 rounded-full",
            )}
          >
            Очистити все
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function CatalogFilterSidebar({
  basePath,
  filters,
}: Pick<CatalogControlsProps, "basePath" | "filters">) {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-40 rounded-lg border border-border/70 bg-card p-4 shadow-sm">
        <CatalogFilterContent basePath={basePath} filters={filters} />
      </div>
    </aside>
  );
}

function MobileFiltersButton({
  basePath,
  filters,
}: Pick<CatalogControlsProps, "basePath" | "filters">) {
  const hasFilters = hasActiveCatalogFilters(filters);
  const activeFilterCount = selectedFilterLabels(filters).length;

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" className="h-10 rounded-lg lg:hidden" />
        }
      >
        <SlidersHorizontalIcon className="size-4" />
        Фільтри
        {hasFilters ? (
          <span className="grid size-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">
            {activeFilterCount}
          </span>
        ) : null}
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Фільтри каталогу</SheetTitle>
          <SheetDescription>
            Уточніть добірку за наявністю, ціною, брендом і типом товарів.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <CatalogFilterContent basePath={basePath} filters={filters} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SortLink({
  basePath,
  filters,
}: Pick<CatalogControlsProps, "basePath" | "filters">) {
  const currentSort = filters.sort ?? "newest";
  const nextSort = currentSort === "popular" ? "newest" : "popular";
  const label =
    catalogSortOptions.find((option) => option.value === currentSort)?.label ??
    "Нові надходження";

  return (
    <Link
      href={createCatalogHref(basePath, filters, { sort: nextSort })}
      className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-lg")}
    >
      {label}
    </Link>
  );
}

function CatalogFilterContent({
  basePath,
  filters,
}: Pick<CatalogControlsProps, "basePath" | "filters">) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold tracking-tight">Фільтри</h2>
        <Link
          href={basePath}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "h-8 rounded-lg")}
        >
          Очистити
        </Link>
      </div>

      <Separator />

      {filterGroups.map((group) => (
        <div key={group.label} className="space-y-3">
          <h3 className="text-sm font-medium">{group.label}</h3>
          <div className="grid gap-2">
            {group.options.map((option) => {
              const isActive = getActiveValue(filters, group.key) === option.value;

              return (
                <Link
                  key={option.value}
                  href={optionHref(basePath, filters, group.key, option.value)}
                  className={cn(
                    "text-muted-foreground hover:text-foreground flex items-center justify-between rounded-md border border-border/70 bg-background px-3 py-2 text-left text-sm transition hover:border-primary/30",
                    isActive && "border-primary/50 bg-primary/10 text-primary",
                  )}
                >
                  <span>{option.label}</span>
                  <span
                    className={cn(
                      "grid size-4 place-items-center rounded-full border border-border",
                      isActive && "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {isActive ? <CheckIcon className="size-3" /> : null}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Сортування</h3>
        <div className="grid gap-2">
          {catalogSortOptions.map((option) => {
            const isActive = (filters.sort ?? "newest") === option.value;

            return (
              <Link
                key={option.value}
                href={createCatalogHref(basePath, filters, {
                  sort: isActive && filters.sort ? undefined : option.value,
                })}
                className={cn(
                  "text-muted-foreground hover:text-foreground flex items-center justify-between rounded-md border border-border/70 bg-background px-3 py-2 text-left text-sm transition hover:border-primary/30",
                  isActive && "border-primary/50 bg-primary/10 text-primary",
                )}
              >
                <span>{option.label}</span>
                <span
                  className={cn(
                    "grid size-4 place-items-center rounded-full border border-border",
                    isActive && "border-primary bg-primary text-primary-foreground",
                  )}
                >
                  {isActive ? <CheckIcon className="size-3" /> : null}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
