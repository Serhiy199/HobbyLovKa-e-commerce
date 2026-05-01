import Image from "next/image";
import Link from "next/link";

import { storefrontBrand } from "@/components/storefront/storefront-config";
import { cn } from "@/lib/utils";

export function StorefrontLogo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex min-w-fit items-center gap-3", className)}
      aria-label={`${storefrontBrand.name} - головна сторінка`}
    >
      <span className="relative block h-12 w-44 overflow-hidden sm:w-52">
        <Image
          src={storefrontBrand.logoSrc}
          alt={`${storefrontBrand.name} logo`}
          fill
          priority
          sizes="(max-width: 640px) 176px, 208px"
          className="object-contain object-left"
        />
      </span>
      {!compact ? (
        <span className="hidden leading-tight xl:block">
          <span className="text-muted-foreground block text-xs">
            {storefrontBrand.tagline}
          </span>
        </span>
      ) : null}
    </Link>
  );
}
