export const catalogAvailabilityOptions = [
  { label: "В наявності", value: "in_stock" },
  { label: "Немає в наявності", value: "out_of_stock" },
] as const;

export const catalogBadgeOptions = [
  { label: "Новинки", value: "new" },
  { label: "Акції", value: "sale" },
  { label: "Топ продажів", value: "hit" },
] as const;

export const catalogPriceRangeOptions = [
  { label: "До 500 грн", value: "under-500" },
  { label: "500-1500 грн", value: "500-1500" },
  { label: "1500+ грн", value: "1500-plus" },
] as const;

export const catalogBrandOptions = [
  { label: "Vaporesso", value: "vaporesso" },
  { label: "Oxva", value: "oxva" },
  { label: "Voopoo", value: "voopoo" },
  { label: "Lost Vape", value: "lost-vape" },
] as const;

export const catalogSortOptions = [
  { label: "Спочатку популярні", value: "popular" },
  { label: "Нові надходження", value: "newest" },
  { label: "Ціна за зростанням", value: "price-asc" },
  { label: "Ціна за спаданням", value: "price-desc" },
] as const;

export type CatalogAvailabilityFilter =
  (typeof catalogAvailabilityOptions)[number]["value"];
export type CatalogBadgeFilter = (typeof catalogBadgeOptions)[number]["value"];
export type CatalogPriceRangeFilter =
  (typeof catalogPriceRangeOptions)[number]["value"];
export type CatalogBrandFilter = (typeof catalogBrandOptions)[number]["value"];
export type CatalogSortFilter = (typeof catalogSortOptions)[number]["value"];

export type CatalogFilterState = {
  availability?: CatalogAvailabilityFilter;
  badge?: CatalogBadgeFilter;
  brandSlug?: CatalogBrandFilter;
  priceRange?: CatalogPriceRangeFilter;
  search?: string;
  sort?: CatalogSortFilter;
};

type CatalogSearchParams = Record<string, string | string[] | undefined>;

function readParam(params: CatalogSearchParams, key: string) {
  const value = params[key];

  return Array.isArray(value) ? value[0] : value;
}

function oneOf<T extends readonly { value: string }[]>(
  options: T,
  value: string | undefined,
): T[number]["value"] | undefined {
  return options.some((option) => option.value === value) ? value : undefined;
}

export function normalizeCatalogFilters(
  params: CatalogSearchParams,
): CatalogFilterState {
  const search = readParam(params, "search")?.trim();

  return {
    availability: oneOf(catalogAvailabilityOptions, readParam(params, "availability")),
    badge: oneOf(catalogBadgeOptions, readParam(params, "badge")),
    brandSlug: oneOf(catalogBrandOptions, readParam(params, "brand")),
    priceRange: oneOf(catalogPriceRangeOptions, readParam(params, "price")),
    search: search || undefined,
    sort: oneOf(catalogSortOptions, readParam(params, "sort")),
  };
}

export function hasActiveCatalogFilters(filters: CatalogFilterState) {
  return Boolean(
    filters.availability ||
      filters.badge ||
      filters.brandSlug ||
      filters.priceRange ||
      filters.search ||
      filters.sort,
  );
}
