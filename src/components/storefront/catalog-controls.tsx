"use client";

import { SlidersHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const filterGroups = [
  {
    label: "Наявність",
    options: ["В наявності", "Новинки", "Акції", "Топ продажів"],
  },
  {
    label: "Ціна",
    options: ["До 500 грн", "500-1500 грн", "1500+ грн"],
  },
  {
    label: "Бренд",
    options: ["Vaporesso", "Oxva", "Voopoo", "Lost Vape"],
  },
];

export function CatalogToolbar({
  count,
  title = "Товари",
}: {
  count: number;
  title?: string;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-lg border border-border/70 bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-muted-foreground text-sm">{count} товарів у добірці</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <MobileFiltersButton />
        <Button variant="outline" className="h-10 rounded-lg">
          Спочатку популярні
        </Button>
        <Button variant="outline" className="h-10 rounded-lg">
          20 на сторінці
        </Button>
      </div>
    </div>
  );
}

export function CatalogFilterSidebar() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-40 rounded-lg border border-border/70 bg-card p-4 shadow-sm">
        <CatalogFilterContent />
      </div>
    </aside>
  );
}

function MobileFiltersButton() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" className="h-10 rounded-lg lg:hidden" />
        }
      >
        <SlidersHorizontalIcon className="size-4" />
        Фільтри
      </SheetTrigger>
      <SheetContent side="left" className="w-full max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Фільтри каталогу</SheetTitle>
          <SheetDescription>
            UI для фільтрів підключимо до query params на наступних ітераціях.
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <CatalogFilterContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function CatalogFilterContent() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold tracking-tight">Фільтри</h2>
        <Button variant="ghost" size="sm" className="h-8 rounded-lg">
          Очистити
        </Button>
      </div>

      <Separator />

      {filterGroups.map((group) => (
        <div key={group.label} className="space-y-3">
          <h3 className="text-sm font-medium">{group.label}</h3>
          <div className="grid gap-2">
            {group.options.map((option) => (
              <button
                key={option}
                type="button"
                className="text-muted-foreground hover:text-foreground flex items-center justify-between rounded-md border border-border/70 bg-background px-3 py-2 text-left text-sm transition hover:border-primary/30"
              >
                <span>{option}</span>
                <span className="size-3 rounded-full border border-border" />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
