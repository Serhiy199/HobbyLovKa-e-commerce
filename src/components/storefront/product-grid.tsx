import type { StorefrontProductCardItem } from "@/components/storefront/product-types";
import { StorefrontProductCard } from "@/components/storefront/product-card";
import { StorefrontEmptyState, StorefrontGrid } from "@/components/storefront/storefront-primitives";

export function StorefrontProductGrid({
  emptyDescription = "Після підключення товарних запитів тут з'являться активні товари з адмінки.",
  emptyTitle = "Товари ще не додані",
  products,
}: {
  emptyDescription?: string;
  emptyTitle?: string;
  products: StorefrontProductCardItem[];
}) {
  if (products.length === 0) {
    return <StorefrontEmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <StorefrontGrid variant="products">
      {products.map((product) => (
        <StorefrontProductCard key={product.slug} product={product} />
      ))}
    </StorefrontGrid>
  );
}
