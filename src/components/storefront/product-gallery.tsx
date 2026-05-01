import { ImageIcon } from "lucide-react";

import { StorefrontCard } from "@/components/storefront/storefront-primitives";

export type StorefrontProductGalleryImage = {
  alt: string | null;
  id: string;
  isPrimary: boolean;
  url: string;
};

export function StorefrontProductGallery({
  images,
  title,
}: {
  images: StorefrontProductGalleryImage[];
  title: string;
}) {
  const primaryImage = images[0];

  return (
    <div className="space-y-3">
      <StorefrontCard className="grid aspect-square place-items-center p-4">
        {primaryImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={primaryImage.url}
            alt={primaryImage.alt ?? title}
            className="h-full w-full rounded-lg object-contain"
          />
        ) : (
          <span className="grid size-24 place-items-center rounded-xl bg-muted text-muted-foreground">
            <ImageIcon className="size-12" />
          </span>
        )}
      </StorefrontCard>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 8).map((image) => (
            <div
              key={image.id}
              className="grid aspect-square place-items-center overflow-hidden rounded-lg border border-border/70 bg-card p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt={image.alt ?? title}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
