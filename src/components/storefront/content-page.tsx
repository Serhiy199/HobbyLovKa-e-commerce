import { ArrowRightIcon } from "lucide-react";

import type { StorefrontContentPage as StorefrontContentPageData } from "@/lib/storefront/content-pages";
import {
  StorefrontActionLink,
  StorefrontBadge,
  StorefrontCard,
  StorefrontGrid,
  StorefrontPageHeader,
  StorefrontSection,
  storefrontPatterns,
} from "@/components/storefront/storefront-primitives";

type StorefrontContentPageProps = {
  page: StorefrontContentPageData;
};

export function StorefrontContentPage({ page }: StorefrontContentPageProps) {
  return (
    <>
      <StorefrontPageHeader
        breadcrumbs={[{ href: "/", label: "Головна" }, { label: page.title }]}
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        actions={
          <StorefrontActionLink href="/catalog" variant="outline" size="default">
            Перейти в каталог
            <ArrowRightIcon className="size-4" />
          </StorefrontActionLink>
        }
      />

      <StorefrontSection>
        <StorefrontGrid variant="content">
          {page.cards.map((card) => {
            const Icon = card.icon;

            return (
              <StorefrontCard key={card.title} className="p-5">
                <div className="space-y-4">
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-lg font-semibold tracking-tight">{card.title}</h2>
                    <p className={storefrontPatterns.bodyText}>{card.description}</p>
                  </div>
                </div>
              </StorefrontCard>
            );
          })}
        </StorefrontGrid>
      </StorefrontSection>

      {page.highlights?.length ? (
        <StorefrontSection tone="muted" spacing="sm">
          <div className="flex flex-wrap gap-2">
            {page.highlights.map((highlight) => (
              <StorefrontBadge key={highlight} tone="muted">
                {highlight}
              </StorefrontBadge>
            ))}
          </div>
        </StorefrontSection>
      ) : null}

      <StorefrontSection>
        <div className="grid gap-6 lg:grid-cols-2">
          {page.sections.map((section) => (
            <StorefrontCard key={section.title} className="p-5">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StorefrontCard>
          ))}
        </div>
      </StorefrontSection>
    </>
  );
}
