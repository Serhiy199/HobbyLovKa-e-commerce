"use client";

import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type StorefrontSearchFormProps = {
  action?: string;
  className?: string;
  defaultValue?: string;
  hiddenParams?: Record<string, string | undefined>;
  inputClassName?: string;
  placeholder?: string;
  showHint?: boolean;
  submitLabel?: string;
};

export function StorefrontSearchForm({
  action = "/catalog",
  className,
  defaultValue,
  hiddenParams,
  inputClassName,
  placeholder = "Пошук товару",
  showHint = false,
  submitLabel = "Знайти",
}: StorefrontSearchFormProps) {
  return (
    <form action={action} method="get" className={cn("relative", className)}>
      {hiddenParams
        ? Object.entries(hiddenParams).map(([key, value]) =>
            value ? <input key={key} type="hidden" name={key} value={value} /> : null,
          )
        : null}
      <SearchIcon className="text-muted-foreground pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2" />
      <Input
        className={cn("h-11 rounded-lg bg-card pl-11 pr-24 shadow-sm", inputClassName)}
        defaultValue={defaultValue}
        name="search"
        placeholder={placeholder}
        type="search"
      />
      <Button
        type="submit"
        size="sm"
        className="absolute right-1.5 top-1/2 h-8 -translate-y-1/2 rounded-md px-3"
      >
        {submitLabel}
      </Button>
      {showHint ? (
        <span className="text-muted-foreground pointer-events-none absolute right-24 top-1/2 hidden -translate-y-1/2 text-xs xl:block">
          pod, рідина, картридж
        </span>
      ) : null}
    </form>
  );
}
