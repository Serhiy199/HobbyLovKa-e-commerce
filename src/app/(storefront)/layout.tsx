import { StorefrontShell } from "@/components/storefront/storefront-shell";

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StorefrontShell>{children}</StorefrontShell>;
}
