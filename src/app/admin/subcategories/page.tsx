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
import { AdminSubcategoryCrud } from "@/features/catalog/components/admin-subcategory-crud";
import { AdminSubcategoryStatusToggle } from "@/features/catalog/components/admin-subcategory-status-toggle";
import { getAdminSubcategoriesPageData } from "@/server/queries/admin-catalog.query";

type SearchParams = Promise<{ selected?: string }>;

export default async function AdminSubcategoriesPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const params = searchParams ? await searchParams : {};
  const selectedId = params.selected?.trim() || undefined;
  const { categories, selectedSubcategory, subcategories } =
    await getAdminSubcategoriesPageData(selectedId);

  const activeCount = subcategories.filter(
    (subcategory) => subcategory.isActive,
  ).length;
  const totalFields = subcategories.reduce(
    (sum, subcategory) => sum + subcategory._count.fields,
    0,
  );
  const totalProducts = subcategories.reduce(
    (sum, subcategory) => sum + subcategory._count.products,
    0,
  );
  const categoryOptions = categories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Підкатегорії"
        title="Керування підкатегоріями каталогу"
        description="Створюйте підкатегорії, прив'язуйте їх до категорій та керуйте активністю без фізичного видалення записів."
        badges={["categoryId обов'язковий", "soft status"]}
      />

      <AdminStatsGrid
        items={[
          {
            label: "Всього",
            value: subcategories.length.toString(),
            note: "Усі підкатегорії в адмінці, незалежно від активності.",
          },
          {
            label: "Активні",
            value: activeCount.toString(),
            note: "Ці записи можуть використовуватися у публічному каталозі.",
          },
          {
            label: "Характеристики",
            value: totalFields.toString(),
            note: "Скільки характеристик уже прив'язано до підкатегорій.",
          },
          {
            label: "Товари",
            value: totalProducts.toString(),
            note: "Показує, де зміна categoryId буде заблокована.",
          },
        ]}
      />

      <AdminActionsBar
        actions={[
          { href: "/admin/categories", label: "Категорії", variant: "outline" },
          {
            href: "/admin/fields",
            label: "Характеристики",
            variant: "outline",
          },
        ]}
        note="Підкатегорії не видаляються фізично. Для приховування використовуйте перемикач активності."
      />

      <AdminSectionCard
        title="Створення підкатегорії"
        description="Форма створення доступна завжди. Після створення підкатегорія з'явиться у списку нижче."
      >
        <AdminSubcategoryCrud
          categories={categoryOptions}
          selectedSubcategory={null}
        />
      </AdminSectionCard>

      <AdminSectionCard
        title="Підкатегорії"
        description="Оберіть підкатегорію зі списку, щоб відкрити форму редагування нижче."
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium">Список підкатегорій</p>
              <p className="text-muted-foreground text-sm leading-6">
                Редагування відкривається для вибраного запису.
              </p>
            </div>
            <Badge variant="outline">{subcategories.length} записів</Badge>
          </div>

          <AdminListTable
            items={subcategories}
            columns={[
              {
                key: "subcategory",
                header: "Підкатегорія",
                cell: (subcategory) => (
                  <span className="font-medium">{subcategory.name}</span>
                ),
              },
              {
                key: "category",
                header: "Категорія",
                cell: (subcategory) => (
                  <span className="text-sm">{subcategory.category.name}</span>
                ),
              },
              {
                key: "slug",
                header: "Slug",
                cell: (subcategory) => (
                  <span className="text-muted-foreground text-sm">
                    {subcategory.slug}
                  </span>
                ),
              },
              {
                key: "usage",
                header: "Характеристики / товари",
                className: "w-52",
                cell: (subcategory) =>
                  `${subcategory._count.fields} / ${subcategory._count.products}`,
              },
              {
                key: "status",
                header: "Статус",
                className: "w-40",
                cell: (subcategory) => (
                  <AdminSubcategoryStatusToggle
                    subcategoryId={subcategory.id}
                    subcategoryName={subcategory.name}
                    initialIsActive={subcategory.isActive}
                  />
                ),
              },
              {
                key: "action",
                header: "Дія",
                className: "w-32 text-right",
                cell: (subcategory) => (
                  <div className="flex justify-end">
                    <Link
                      href={`/admin/subcategories?selected=${subcategory.id}`}
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
                icon={getAdminModuleIcon("subcategories")}
                title="Підкатегорії ще не створені"
                description={
                  categories.length
                    ? "Створіть першу підкатегорію у формі вище."
                    : "Спочатку створіть категорію, а потім додайте до неї підкатегорію."
                }
              />
            }
          />
        </div>
      </AdminSectionCard>

      {selectedId && selectedSubcategory ? (
        <>
          <AdminSectionCard
            title={`Редагування підкатегорії: ${selectedSubcategory.name}`}
            description="Змініть дані вибраної підкатегорії або скасуйте редагування."
          >
            <AdminSubcategoryCrud
              key={`${selectedSubcategory.id}:${selectedSubcategory.name}:${selectedSubcategory.isActive}`}
              categories={categoryOptions}
              selectedSubcategory={{
                categoryId: selectedSubcategory.categoryId,
                description: selectedSubcategory.description,
                id: selectedSubcategory.id,
                isActive: selectedSubcategory.isActive,
                name: selectedSubcategory.name,
                productsCount: selectedSubcategory._count.products,
                seoDescription: selectedSubcategory.seoDescription,
                seoTitle: selectedSubcategory.seoTitle,
                sortOrder: selectedSubcategory.sortOrder,
              }}
            />
          </AdminSectionCard>

          <AdminSectionCard
            title="Характеристики підкатегорії"
            description="Пов'язані характеристики зберігаються під час перейменування, зміни slug або статусу."
          >
            <div className="space-y-3">
              {selectedSubcategory.fields.length ? (
                selectedSubcategory.fields.map((field) => (
                  <div
                    key={field.id}
                    className="border-border/70 bg-card/70 flex items-start justify-between gap-3 rounded-lg border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{field.label}</p>
                      <p className="text-muted-foreground text-xs">
                        {field.key}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{field.type}</Badge>
                      {field.isRequired ? (
                        <Badge variant="secondary">Обов&apos;язкове</Badge>
                      ) : null}
                      {field.isFilterable ? (
                        <Badge variant="outline">Фільтр</Badge>
                      ) : null}
                      <Badge variant="outline">#{field.sortOrder}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <AdminEmptyState
                  title="Полів ще немає"
                  description="Це нормальний стан для нової підкатегорії. Характеристики можна додати в окремому розділі."
                />
              )}
            </div>
          </AdminSectionCard>
        </>
      ) : null}
    </div>
  );
}
