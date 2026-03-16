import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { InfoIcon } from "lucide-react";

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
        <InputGroup>
          <InputGroupInput
            id={name}
            type={type}
            placeholder={placeholder}
            required={required}
            className={cn(
              className,
              `${disabled ? "border-[1px] border-red-600" : ""}`
            )}
            ref={ref}
            // className={cn(
            //   "flex h-8 w-full rounded/u-xl bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            //   className
            // )}
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

InputField.displayName = "InputField";

export { InputField };
