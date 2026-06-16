import { Field, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import React from "react";
import { InputGroup, InputGroupTextarea } from "./input-group";

const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(
  (
    {
      title,
      name,
      placeholder,
      required,
      className,
      disabled,
      content,
      ...props
    },
    ref
  ) => {
    return (
      <Field data-invalid={disabled}>
        <InputGroup>
          <InputGroupTextarea
            id={name}
            placeholder={placeholder}
            required={required}
            rows={5}
            cols={20}
            wrap=""
            className={cn(
              className,
              `${disabled ? "border-[1px] border-red-600" : ""}`
            )}
            {...props}
          />
          {/* <InputGroupAddon align="inline-end">
            <InfoIcon />
          </InputGroupAddon> */}
        </InputGroup>
        {content && <FieldError>{content}</FieldError>}
      </Field>
    );
  }
);

TextAreaField.displayName = "TextAreaField";

export { TextAreaField };
