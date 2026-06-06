"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Clock2Icon } from "lucide-react";
import * as React from "react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { CalendarDialog } from "./calenderWithDialog";
import { Card, CardContent } from "./card";
import { ClendarButtonGroup } from "./ClendarButtonGroup";
import { Field, FieldGroup, FieldLabel } from "./field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function CalendarWithTime({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  dateValue,
  setDate,
  title,
  message,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  dateValue: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  title?: string;
  message?: boolean;
}) {
  const handleInputChange = (event: any) => {
    const yearMMDD = dayjs(dateValue).format("YYYY, MM, DD");

    // "2025, 12, 25"; // example: "YYYY, MM, DD"
    const timeHHMM = `${event.target.value.split(":")[0]}:${event.target.value.split(":")[1]}:${event.target.value.split(":")[2]}`;
    // parse
    const [yearStr, monthStr, dayStr] = yearMMDD
      .split(",")
      .map((s) => s.trim());
    const [hourStr, minuteStr, secondStr] = timeHHMM
      .split(":")
      .map((s) => s.trim());

    const year = Number(yearStr);
    const month = Number(monthStr); // 1-12
    const day = Number(dayStr);

    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    const second = Number(secondStr);

    // Note: JavaScript Date months are 0-based
    const date = new Date(year, month - 1, day, hour, minute, second, 0);

    setDate(date);
  };

  return (
    <Card size="sm" className="mx-auto w-full bg-primary h-fit">
      <CardContent>
        <FieldGroup>
          <Field>
            {title && <FieldLabel htmlFor="time-from">{title}</FieldLabel>}
            <InputGroup>
              <ClendarButtonGroup
                dateValue={dateValue}
                errors={message || false}
                // description={errors.category?.message}
              >
                <CalendarDialog
                  required
                  mode="single"
                  selected={dateValue}
                  month={dateValue}
                  onSelect={setDate}
                  className=" border-white rounded"
                  captionLayout="dropdown"
                  title="a"
                  dateValue={dateValue}
                  setDate={setDate}
                />
              </ClendarButtonGroup>
            </InputGroup>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                value={`${dayjs(dateValue).format("HH")}:${dayjs(dateValue).format("mm")}:${dayjs(dateValue).format("ss")}`}
                onChange={handleInputChange}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { CalendarDayButton, CalendarWithTime };
