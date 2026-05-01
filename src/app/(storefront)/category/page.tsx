import { StorefrontCategoryCard } from "@/components/storefront/category-card";
import {
  StorefrontGrid,
  StorefrontPageHeader,
  StorefrontSection,
} from "@/components/storefront/storefront-primitives";
import { listActiveStorefrontCategories } from "@/server/queries/storefront-catalog.query";

export const dynamic = "force-dynamic";

export default async function CategoryIndexPage() {
  const categories = await listActiveStorefrontCategories();

  return (
    <>
      <StorefrontPageHeader
        breadcrumbs={[{ href: "/", label: "Головна" }, { label: "Категорії" }]}
        eyebrow="Категорії"
        title="Категорії магазину"
        description="Оберіть основний напрямок, щоб перейти до товарів, підкатегорій і фільтрів."
      />

      <StorefrontSection>
        <StorefrontGrid variant="categories">
          {categories.map((category) => (
            <StorefrontCategoryCard key={category.href} category={category} />
          ))}
        </StorefrontGrid>
      </StorefrontSection>
    </>
  );
}
