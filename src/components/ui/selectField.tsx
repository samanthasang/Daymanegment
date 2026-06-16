import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TCategory } from "@/modules/category/categoryList.slice";

export function SelectField({
  title,
  description,
  name,
  placeholder,
  required,
  className,
  invalid = false,
  itemArray,
  onValueChange,
  value,
}: {
  title: string;
  description?: string;
  name: string;
  placeholder: string;
  className?: string;
  required: boolean;
  invalid: boolean;
  itemArray: TCategory[];
  onValueChange: (data: string) => void;
  value: string;
}) {
  return (
    <Field data-invalid={invalid}>
      {/* <FieldLabel htmlFor={name}>{title}</FieldLabel> */}
      <Select
        required={required}
        onValueChange={(data) => data && onValueChange(data)}
        value={value}
      >
        <SelectTrigger
          aria-invalid={invalid}
          className={cn(
            "flex h-8 w-full rounded-xl border border-border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
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
      {description && <FieldError>{description}</FieldError>}
    </Field>
  );
}
