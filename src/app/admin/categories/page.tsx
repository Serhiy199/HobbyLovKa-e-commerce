import Link from "next/link";

import { AdminListTable } from "@/components/admin/admin-data-primitives";
import { getAdminModuleIcon } from "@/components/admin/admin-module-scaffold";
import {
  AdminActionsBar,
  AdminEmptyState,
  AdminPageHeader,
  AdminSectionCard,
  AdminStatsGrid,
} from "@/components/admin/admin-primitives";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AdminCategoryUpdateForm } from "@/features/catalog/components/admin-category-update-form";
import { AdminCategoryStatusToggle } from "@/features/catalog/components/admin-category-status-toggle";
import { getAdminCategoriesPageData } from "@/server/queries/admin-catalog.query";

type SearchParams = Promise<{ selected?: string }>;

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = searchParams ? await searchParams : {};
  const selectedId = params.selected?.trim() || undefined;
  const { categories, selectedCategory } =
    await getAdminCategoriesPageData(selectedId);

  const activeCount = categories.filter((category) => category.isActive).length;
  const totalSubcategories = categories.reduce(
    (sum, category) => sum + category._count.subcategories,
    0,
  );
  const totalProducts = categories.reduce(
    (sum, category) => sum + category._count.products,
    0,
  );

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Категорії"
        title="Керування категоріями каталогу"
        description="Категорії створюються і редагуються в адмінці. Фізичного видалення немає: видимість керується статусом active / inactive."
        badges={["Каталог", "Soft status"]}
      />

      <AdminStatsGrid
        items={[
          {
            label: "Категорії",
            value: categories.length.toString(),
            note: "Усі категорії зберігаються в базі, навіть якщо вони неактивні.",
          },
          {
            label: "Активні",
            value: activeCount.toString(),
            note: "Саме активні категорії мають відображатися на storefront.",
          },
          {
            label: "Підкатегорії",
            value: totalSubcategories.toString(),
            note: "Загальна кількість дочірніх розділів у дереві каталогу.",
          },
          {
            label: "Товари",
            value: totalProducts.toString(),
            note: "Показує, скільки товарів уже прив'язано до категорій.",
          },
        ]}
      />

      <AdminActionsBar
        actions={[
          {
            href: "/admin",
            label: "До огляду",
            variant: "outline",
          },
          {
            href: "/admin/subcategories",
            label: "Підкатегорії",
            variant: "outline",
          },
        ]}
        note="Видалення категорій не передбачене. Для приховування використовуйте перемикач активності."
      />

      <AdminSectionCard
        title="Створення категорії"
        description="Форма створення доступна завжди. Після створення категорія з'явиться у списку нижче."
      >
        <AdminCategoryUpdateForm />
      </AdminSectionCard>

      <AdminSectionCard
        title="Категорії"
        description="Оберіть категорію зі списку, щоб відкрити форму редагування нижче."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Список категорій</p>
              <p className="text-muted-foreground text-sm leading-6">
                Редагування відкривається для вибраного запису.
              </p>
            </div>
            <Badge variant="outline">{categories.length} записів</Badge>
          </div>

          <AdminListTable
            items={categories}
            columns={[
              {
                key: "name",
                header: "Категорія",
                cell: (category) => (
                  <div className="flex items-center gap-3">
                    <div className="bg-muted border-border/70 h-12 w-12 shrink-0 overflow-hidden rounded-md border">
                      {category.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={category.image}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 space-y-1">
                      <p className="font-medium">{category.name}</p>
                    </div>
                  </div>
                ),
              },
              {
                key: "slug",
                header: "Slug",
                cell: (category) => (
                  <span className="text-muted-foreground text-sm">
                    {category.slug}
                  </span>
                ),
              },
              {
                key: "counts",
                header: "Підкатегорії / товари",
                className: "w-48",
                cell: (category) =>
                  `${category._count.subcategories} / ${category._count.products}`,
              },
              {
                key: "status",
                header: "Статус",
                className: "w-36",
                cell: (category) => (
                  <AdminCategoryStatusToggle
                    categoryId={category.id}
                    categoryName={category.name}
                    initialIsActive={category.isActive}
                  />
                ),
              },
              {
                key: "action",
                header: "Дія",
                className: "w-32 text-right",
                cell: (category) => (
                  <div className="flex justify-end">
                    <Link
                      href={`/admin/categories?selected=${category.id}`}
                      scroll={false}
                      className={buttonVariants({
                        size: "sm",
                        variant: "edit",
                      })}
                    >
                      Редагувати
                    </Link>
                  </div>
                ),
              },
            ]}
            emptyState={
              <AdminEmptyState
                icon={getAdminModuleIcon("categories")}
                title="Категорій ще немає"
                description="Створіть першу категорію у формі вище."
              />
            }
          />
        </div>
      </AdminSectionCard>

      {selectedId && selectedCategory ? (
        <AdminSectionCard
          title={`Редагування категорії: ${selectedCategory.name}`}
          description="Змініть дані вибраної категорії або скасуйте редагування."
        >
          <AdminCategoryUpdateForm
            key={`${selectedCategory.id}:${selectedCategory.name}:${selectedCategory.isActive}`}
            category={{
              description: selectedCategory.description,
              id: selectedCategory.id,
              image: selectedCategory.image,
              isActive: selectedCategory.isActive,
              name: selectedCategory.name,
              seoDescription: selectedCategory.seoDescription,
              seoTitle: selectedCategory.seoTitle,
              sortOrder: selectedCategory.sortOrder,
            }}
          />
        </AdminSectionCard>
      ) : null}
    </div>
  );
}
