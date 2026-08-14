"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { showAdminToast } from "@/components/admin/admin-toast";
import { Switch } from "@/components/ui/switch";
import { toggleCategoryStatusAction } from "@/features/catalog/actions/admin-catalog";

export function AdminCategoryStatusToggle({
  categoryId,
  categoryName,
  initialIsActive,
}: {
  categoryId: string;
  categoryName: string;
  initialIsActive: boolean;
}) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(initialIsActive);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (nextIsActive: boolean) => {
    const previousIsActive = isActive;
    setIsActive(nextIsActive);

    startTransition(async () => {
      try {
        const result = await toggleCategoryStatusAction({
          id: categoryId,
          isActive: nextIsActive,
        });

        if (!result.ok) {
          setIsActive(previousIsActive);
          showAdminToast({
            title: "Не вдалося змінити статус",
            message: result.error,
            variant: "error",
          });
          return;
        }

        setIsActive(result.data.isActive);
        showAdminToast({
          title: result.data.isActive
            ? "Категорію активовано"
            : "Категорію деактивовано",
          message: categoryName,
        });
        router.refresh();
      } catch {
        setIsActive(previousIsActive);
        showAdminToast({
          title: "Не вдалося змінити статус",
          message: "Спробуйте ще раз.",
          variant: "error",
        });
      }
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isActive}
        disabled={isPending}
        onCheckedChange={handleStatusChange}
        aria-label={`${isActive ? "Деактивувати" : "Активувати"} категорію ${categoryName}`}
      />
      <span className="text-sm font-medium" aria-live="polite">
        {isActive ? "Активна" : "Неактивна"}
      </span>
    </div>
  );
}
