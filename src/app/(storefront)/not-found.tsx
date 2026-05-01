import { ArrowLeftIcon, SearchIcon } from "lucide-react";

import {
  StorefrontActionLink,
  StorefrontEmptyState,
  StorefrontPageHeader,
  StorefrontSection,
} from "@/components/storefront/storefront-primitives";

export default function StorefrontNotFound() {
  return (
    <>
      <StorefrontPageHeader
        breadcrumbs={[{ href: "/", label: "Головна" }, { label: "404" }]}
        eyebrow="404"
        title="Сторінку не знайдено"
        description="Адреса могла змінитись, товар міг бути вимкнений або сторінка ще не додана до магазину."
      />
      <StorefrontSection>
        <StorefrontEmptyState
          title="Тут нічого немає"
          description="Поверніться на головну або відкрийте каталог, щоб продовжити перегляд магазину."
          icon={<SearchIcon className="size-6" />}
          action={
            <div className="flex flex-wrap justify-center gap-2">
              <StorefrontActionLink href="/" variant="outline" size="default">
                <ArrowLeftIcon className="size-4" />
                На головну
              </StorefrontActionLink>
              <StorefrontActionLink href="/catalog" size="default">
                Перейти в каталог
              </StorefrontActionLink>
            </div>
          }
        />
      </StorefrontSection>
    </>
  );
}
