import { ButtonGroup } from "@/components/ui/buttonGroup";
import { Field, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";

export function ClendarButtonGroup({
  dateValue,
  children,
  description,
  errors,
}: {
  dateValue: Date | undefined;
  description?: string;
  errors: boolean;
  children: React.ReactNode;
}) {
  return (
    <Field data-invalid={errors}>
      <ButtonGroup>
        <div
          className={cn(
            "flex h-8 w-full rounded-xl border border-border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            !dateValue && "text-muted-foreground",
            errors && " border-red-500"
          )}
        >
          {dateValue ? format(dateValue, "PPP") : <span>Pick a date</span>}
        </div>
        <div>{children}</div>
      </ButtonGroup>
      {description && <FieldError>{description}</FieldError>}
    </Field>
  );
}
