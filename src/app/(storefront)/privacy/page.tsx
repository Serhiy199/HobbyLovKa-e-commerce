import { StorefrontContentPage } from "@/components/storefront/content-page";
import { storefrontContentPages } from "@/lib/storefront/content-pages";

export default function PrivacyPage() {
  return <StorefrontContentPage page={storefrontContentPages.privacy} />;
}
