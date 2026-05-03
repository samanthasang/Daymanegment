import { ButtonGroup } from "@/components/ui/buttonGroup";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { TCategory } from "@/modules/category/categoryList.slice";

export function SelectButtonGroup({
  title,
  name,
  placeholder,
  required = false,
  className,
  errors = false,
  itemArray,
  onValueChange,
  value,
  description,
  children,
}: {
  title: string;
  name: string;
  placeholder: string;
  description?: string;
  className?: string;
  required?: boolean;
  errors: boolean;
  itemArray: TCategory[];
  onValueChange: (data: string) => void;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <Field data-invalid={errors}>
      {/* <FieldLabel htmlFor={name}>{title}</FieldLabel> */}
      <ButtonGroup>
        <Select
          required={required}
          onValueChange={(data) => data && onValueChange(data)}
          value={value}
        >
          <SelectTrigger
            aria-invalid={errors}
            className={cn(
              "flex h-8 w-full rounded-xl border border-border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="rounded-2xl">
            <SelectGroup>
              {itemArray.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>{children}</div>
      </ButtonGroup>
      {description && <FieldError>{description}</FieldError>}
    </Field>
  );
}
