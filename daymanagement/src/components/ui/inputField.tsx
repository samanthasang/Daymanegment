import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";

const InputField = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(
  (
    {
      title,
      name,
      placeholder,
      required,
      type,
      className,
      disabled,
      content,
      ...props
    },
    ref
  ) => {
    return (
      <Field data-invalid={disabled}>
        <FieldLabel htmlFor={name}>{content || title}</FieldLabel>
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          required={required}
          className={className}
          ref={ref}
          {...props}
        />
        {/* {description && <FieldError>{description}</FieldError>} */}
      </Field>
    );
  }
);

InputField.displayName = "InputField";

export { InputField };
