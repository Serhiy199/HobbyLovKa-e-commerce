import { AgeGate } from "@/components/storefront/age-gate";
import { CookieConfirm } from "@/components/storefront/cookie-confirm";
import { StorefrontFooter } from "@/components/storefront/storefront-footer";
import { StorefrontHeader } from "@/components/storefront/storefront-header";

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StorefrontHeader />
      <main className="min-h-[calc(100vh-420px)]">{children}</main>
      <StorefrontFooter />
      <AgeGate />
      <CookieConfirm />
    </div>
  );
}
