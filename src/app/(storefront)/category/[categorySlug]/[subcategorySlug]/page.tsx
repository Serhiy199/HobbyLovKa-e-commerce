import { notFound } from "next/navigation";

import { CatalogFilterSidebar, CatalogToolbar } from "@/components/storefront/catalog-controls";
import { StorefrontProductGrid } from "@/components/storefront/product-grid";
import {
  StorefrontBadge,
  StorefrontCard,
  StorefrontGrid,
  StorefrontPageHeader,
  StorefrontSection,
} from "@/components/storefront/storefront-primitives";
import {
  getActiveStorefrontSubcategoryBySlug,
  listActiveStorefrontProducts,
} from "@/server/queries/storefront-catalog.query";

export const dynamic = "force-dynamic";

type SubcategoryPageProps = {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
  }>;
};

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { categorySlug, subcategorySlug } = await params;
  const [subcategory, products] = await Promise.all([
    getActiveStorefrontSubcategoryBySlug({ categorySlug, subcategorySlug }),
    listActiveStorefrontProducts({ categorySlug, subcategorySlug }),
  ]);

  if (!subcategory) {
    notFound();
  }

  return (
    <>
      <StorefrontPageHeader
        breadcrumbs={[
          { href: "/", label: "Головна" },
          { href: "/category", label: "Категорії" },
          {
            href: `/category/${subcategory.category.slug}`,
            label: subcategory.category.name,
          },
          { label: subcategory.name },
        ]}
        eyebrow="Підкатегорія"
        title={subcategory.name}
        description={
          subcategory.description ??
          "Товари підкатегорії з характеристиками, які керуються з адмін-панелі."
        }
      />

      {subcategory.fields.length > 0 ? (
        <StorefrontSection tone="muted" spacing="sm">
          <StorefrontGrid variant="content">
            {subcategory.fields.map((field) => (
              <StorefrontCard key={field.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-semibold tracking-tight">{field.label}</h2>
                    <StorefrontBadge tone="muted">{field.type}</StorefrontBadge>
                  </div>
                  {field.options.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {field.options.slice(0, 6).map((option) => (
                        <span
                          key={option.id}
                          className="text-muted-foreground rounded-md bg-muted px-2.5 py-1 text-xs"
                        >
                          {option.label}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Поле доступне для фільтрації товарів цієї підкатегорії.
                    </p>
                  )}
                </div>
              </StorefrontCard>
            ))}
          </StorefrontGrid>
        </StorefrontSection>
      ) : null}

      <StorefrontSection>
        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <CatalogFilterSidebar />
          <div>
            <CatalogToolbar count={products.length} title={subcategory.name} />
            <StorefrontProductGrid
              products={products}
              emptyTitle="У цій підкатегорії ще немає активних товарів"
              emptyDescription="Додайте або активуйте товари цієї підкатегорії в адмін-панелі."
            />
          </div>
        </div>
      </StorefrontSection>
    </>
  );
}
