import StorefrontNotFound from "@/app/(storefront)/not-found";
import { StorefrontShell } from "@/components/storefront/storefront-shell";

export default function NotFound() {
  return (
    <StorefrontShell>
      <StorefrontNotFound />
    </StorefrontShell>
  );
}
