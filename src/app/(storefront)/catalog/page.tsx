import { CatalogFilterSidebar, CatalogToolbar } from "@/components/storefront/catalog-controls";
import { StorefrontProductGrid } from "@/components/storefront/product-grid";
import {
  StorefrontPageHeader,
  StorefrontSection,
} from "@/components/storefront/storefront-primitives";
import { listActiveStorefrontProducts } from "@/server/queries/storefront-catalog.query";

export const dynamic = "force-dynamic";

type CatalogPageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const resolvedSearchParams = await searchParams;
  const products = await listActiveStorefrontProducts({
    search: resolvedSearchParams.search,
  });

  return (
    <>
      <StorefrontPageHeader
        breadcrumbs={[{ href: "/", label: "Головна" }, { label: "Каталог" }]}
        eyebrow="Каталог"
        title="Усі товари"
        description="Повна storefront-вітрина активних товарів з адмін-панелі. Фільтри та сортування поки працюють як UI-рівень."
      />

      <StorefrontSection>
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <CatalogFilterSidebar />
          <div>
            <CatalogToolbar count={products.length} title="Каталог товарів" />
            <StorefrontProductGrid
              products={products}
              emptyTitle="У каталозі ще немає активних товарів"
              emptyDescription="Додайте товари в адмінці та увімкніть активність, щоб вони з’явилися тут."
            />
          </div>
        </div>
      </StorefrontSection>
    </>
  );
}
