import { ButtonGroup } from "@/components/ui/buttonGroup";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function InputButtonGroup({
  title,
  children,
  name,
  placeholder,
  required,
  type,
  invalid = false,
}: {
  title: string;
  children: React.ReactNode;
  name: string;
  placeholder: string;
  type: string;
  required: boolean;
  invalid: boolean;
}) {
  return (
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={name}>{title}</FieldLabel>
      <ButtonGroup>
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          required={required}
        />

        {children}
      </ButtonGroup>
    </Field>
  );
}
