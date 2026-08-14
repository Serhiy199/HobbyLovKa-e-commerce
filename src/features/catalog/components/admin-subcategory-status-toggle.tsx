"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { showAdminToast } from "@/components/admin/admin-toast";
import { Switch } from "@/components/ui/switch";
import { toggleSubcategoryStatusAction } from "@/features/catalog/actions/admin-catalog";

export function AdminSubcategoryStatusToggle({
  subcategoryId,
  subcategoryName,
  initialIsActive,
}: {
  subcategoryId: string;
  subcategoryName: string;
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
        const result = await toggleSubcategoryStatusAction({
          id: subcategoryId,
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
            ? "Підкатегорію активовано"
            : "Підкатегорію деактивовано",
          message: subcategoryName,
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
        aria-label={`${isActive ? "Деактивувати" : "Активувати"} підкатегорію ${subcategoryName}`}
      />
      <span className="text-sm font-medium" aria-live="polite">
        {isActive ? "Активна" : "Неактивна"}
      </span>
    </div>
  );
}
