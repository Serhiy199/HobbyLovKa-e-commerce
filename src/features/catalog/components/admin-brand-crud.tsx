"use client";

import type { FormEvent } from "react";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  AdminFormGrid,
  AdminFormSection,
  AdminInputField,
  AdminTextareaField,
} from "@/components/admin/admin-form-primitives";
import {
  AdminEmptyState,
  AdminSectionCard,
} from "@/components/admin/admin-primitives";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  createBrandAction,
  deleteBrandAction,
  updateBrandAction,
} from "@/features/catalog/actions/admin-catalog";

type SelectedBrand = {
  id: string;
  description: string | null;
  isActive: boolean;
  name: string;
  slug: string;
  sortOrder: number;
};

type BrandFormValues = {
  description: string;
  isActive: boolean;
  name: string;
  slug: string;
  sortOrder: string;
};

type BrandFieldErrors = Partial<Record<keyof BrandFormValues, string>>;

type AdminBrandCrudProps = {
  selectedBrand: SelectedBrand | null;
};

function buildCreateValues(): BrandFormValues {
  return {
    description: "",
    isActive: true,
    name: "",
    slug: "",
    sortOrder: "0",
  };
}

function buildEditValues(selectedBrand: SelectedBrand): BrandFormValues {
  return {
    description: selectedBrand.description ?? "",
    isActive: selectedBrand.isActive,
    name: selectedBrand.name,
    slug: selectedBrand.slug,
    sortOrder: selectedBrand.sortOrder.toString(),
  };
}

function mapFieldErrors(
  fieldErrors?: Record<string, string[] | undefined>,
): BrandFieldErrors {
  return {
    description: fieldErrors?.description?.[0],
    name: fieldErrors?.name?.[0],
    slug: fieldErrors?.slug?.[0],
    sortOrder: fieldErrors?.sortOrder?.[0],
  };
}

function BrandFormFields({
  errors,
  heading,
  values,
  onActiveChange,
  onInputChange,
}: {
  errors: BrandFieldErrors;
  heading: string;
  values: BrandFormValues;
  onActiveChange: (value: boolean) => void;
  onInputChange: (
    field: keyof Omit<BrandFormValues, "isActive">,
    value: string,
  ) => void;
}) {
  return (
    <AdminFormSection
      title={heading}
      description="Форма напряму підключена до write-side для брендів."
    >
      <AdminFormGrid>
        <AdminInputField
          id={`${heading}-name`}
          label="Назва"
          value={values.name}
          onChange={(event) => onInputChange("name", event.target.value)}
          error={errors.name}
          required
        />

        <AdminInputField
          id={`${heading}-slug`}
          label="Slug"
          value={values.slug}
          onChange={(event) => onInputChange("slug", event.target.value)}
          error={errors.slug}
          hint="Лише нижній регістр, цифри та дефіси."
          required
        />

        <AdminInputField
          id={`${heading}-sortOrder`}
          type="number"
          min={0}
          step={1}
          label="Порядок сортування"
          value={values.sortOrder}
          onChange={(event) => onInputChange("sortOrder", event.target.value)}
          error={errors.sortOrder}
          required
        />
      </AdminFormGrid>

      <div className="mt-4 space-y-4">
        <AdminTextareaField
          id={`${heading}-description`}
          label="Опис"
          value={values.description}
          onChange={(event) => onInputChange("description", event.target.value)}
          error={errors.description}
          rows={4}
        />

        <div className="flex items-start justify-between gap-4 rounded-2xl border border-border/70 bg-card/90 px-4 py-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">Активний у каталозі</p>
            <p className="text-muted-foreground text-sm leading-6">
              Можна вмикати й вимикати бренд без видалення та без змін у коді.
            </p>
          </div>
          <Switch
            checked={values.isActive}
            onCheckedChange={onActiveChange}
            aria-label="Активний у каталозі"
          />
        </div>
      </div>
    </AdminFormSection>
  );
}

export function AdminBrandCrud({ selectedBrand }: AdminBrandCrudProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeAction, setActiveAction] = useState<
    "create" | "delete" | "update" | null
  >(null);

  const [createValues, setCreateValues] = useState(buildCreateValues);
  const [createErrors, setCreateErrors] = useState<BrandFieldErrors>({});
  const [createMessage, setCreateMessage] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  const [editValues, setEditValues] = useState<BrandFormValues | null>(
    selectedBrand ? buildEditValues(selectedBrand) : null,
  );
  const [editErrors, setEditErrors] = useState<BrandFieldErrors>({});
  const [editMessage, setEditMessage] = useState<string | null>(null);
  const [editSuccess, setEditSuccess] = useState<string | null>(null);

  useEffect(() => {
    setEditValues(selectedBrand ? buildEditValues(selectedBrand) : null);
    setEditErrors({});
    setEditMessage(null);
    setEditSuccess(null);
  }, [selectedBrand]);

  const updateCreateField = (
    field: keyof Omit<BrandFormValues, "isActive">,
    value: string,
  ) => {
    setCreateValues((current) => ({
      ...current,
      [field]: value,
    }));
    setCreateErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
    setCreateMessage(null);
    setCreateSuccess(null);
  };

  const updateEditField = (
    field: keyof Omit<BrandFormValues, "isActive">,
    value: string,
  ) => {
    setEditValues((current) =>
      current
        ? {
            ...current,
            [field]: value,
          }
        : current,
    );
    setEditErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
    setEditMessage(null);
    setEditSuccess(null);
  };

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCreateMessage(null);
    setCreateSuccess(null);

    setActiveAction("create");
    startTransition(async () => {
      try {
        const result = await createBrandAction(createValues);

        if (!result.ok) {
          setCreateErrors(mapFieldErrors(result.fieldErrors));
          setCreateMessage(result.error);
          return;
        }

        setCreateErrors({});
        setCreateSuccess("Бренд створено.");
        setCreateValues(buildCreateValues());
        router.push(`/admin/brands?selected=${result.data.id}`);
        router.refresh();
      } finally {
        setActiveAction(null);
      }
    });
  };

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedBrand || !editValues) {
      return;
    }

    setEditMessage(null);
    setEditSuccess(null);

    setActiveAction("update");
    startTransition(async () => {
      try {
        const result = await updateBrandAction({
          id: selectedBrand.id,
          ...editValues,
        });

        if (!result.ok) {
          setEditErrors(mapFieldErrors(result.fieldErrors));
          setEditMessage(result.error);
          return;
        }

        setEditErrors({});
        setEditSuccess("Бренд оновлено.");
        router.push(`/admin/brands?selected=${result.data.id}`);
        router.refresh();
      } finally {
        setActiveAction(null);
      }
    });
  };

  const handleDelete = () => {
    if (!selectedBrand) {
      return;
    }

    const confirmed = window.confirm(`Видалити бренд "${selectedBrand.name}"?`);

    if (!confirmed) {
      return;
    }

    setEditMessage(null);
    setEditSuccess(null);

    setActiveAction("delete");
    startTransition(async () => {
      try {
        const result = await deleteBrandAction({
          id: selectedBrand.id,
        });

        if (!result.ok) {
          setEditMessage(result.error);
          return;
        }

        router.push("/admin/brands");
        router.refresh();
      } finally {
        setActiveAction(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      {selectedBrand && editValues ? (
        <AdminSectionCard
          title="Редагування та видалення"
          description="Тут уже працює реальний update/delete для вибраного бренду."
        >
          <form className="space-y-4" onSubmit={handleUpdate}>
            <BrandFormFields
              errors={editErrors}
              heading="Оновлення бренду"
              values={editValues}
              onActiveChange={(value) => {
                setEditValues((current) =>
                  current
                    ? {
                        ...current,
                        isActive: value,
                      }
                    : current,
                );
                setEditMessage(null);
                setEditSuccess(null);
              }}
              onInputChange={updateEditField}
            />

            {editMessage ? (
              <div className="border-destructive/20 bg-destructive/8 text-destructive rounded-2xl border px-4 py-3 text-sm">
                {editMessage}
              </div>
            ) : null}

            {editSuccess ? (
              <div className="border-primary/20 bg-primary/8 rounded-2xl border px-4 py-3 text-sm">
                {editSuccess}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground text-sm leading-6">
                Видалення доступне лише для брендів без пов&apos;язаних товарів.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isPending}
                >
                  {activeAction === "delete" ? "Видаляємо..." : "Видалити"}
                </Button>
                <Button type="submit" disabled={isPending}>
                  {activeAction === "update" ? "Зберігаємо..." : "Зберегти зміни"}
                </Button>
              </div>
            </div>
          </form>
        </AdminSectionCard>
      ) : (
        <AdminEmptyState
          title="Оберіть бренд для редагування"
          description="Create форма вже доступна нижче, а щойно ви виберете бренд зі списку, тут з'явиться реальний update/delete."
        />
      )}

      <AdminSectionCard
        title="Створення нового бренду"
        description="Форма створює новий бренд і одразу відкриває його в detail panel."
      >
        <form className="space-y-4" onSubmit={handleCreate}>
          <BrandFormFields
            errors={createErrors}
            heading="Новий бренд"
            values={createValues}
            onActiveChange={(value) => {
              setCreateValues((current) => ({
                ...current,
                isActive: value,
              }));
              setCreateMessage(null);
              setCreateSuccess(null);
            }}
            onInputChange={updateCreateField}
          />

          {createMessage ? (
            <div className="border-destructive/20 bg-destructive/8 text-destructive rounded-2xl border px-4 py-3 text-sm">
              {createMessage}
            </div>
          ) : null}

          {createSuccess ? (
            <div className="border-primary/20 bg-primary/8 rounded-2xl border px-4 py-3 text-sm">
              {createSuccess}
            </div>
          ) : null}

          <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-muted-foreground text-sm leading-6">
              Бренди тепер повністю керуються з адмінки, включно з сортуванням і
              активацією.
            </p>
            <Button type="submit" disabled={isPending}>
              {activeAction === "create" ? "Створюємо..." : "Створити бренд"}
            </Button>
          </div>
        </form>
      </AdminSectionCard>
    </div>
  );
}
