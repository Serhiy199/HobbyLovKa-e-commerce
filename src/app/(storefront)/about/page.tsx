import { StorefrontContentPage } from "@/components/storefront/content-page";
import { storefrontContentPages } from "@/lib/storefront/content-pages";

export default function AboutPage() {
  return <StorefrontContentPage page={storefrontContentPages.about} />;
}
