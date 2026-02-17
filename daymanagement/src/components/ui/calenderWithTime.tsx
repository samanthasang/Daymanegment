"use client";

import * as React from "react";

import { Clock2Icon } from "lucide-react";

import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "./calendar";
import { Card, CardContent, CardFooter } from "./card";
import { Field, FieldGroup, FieldLabel } from "./field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
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
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  dateValue: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  title: string;
}) {
  const handleInputChange = (event: any) => {
    const yearMMDD = dayjs(dateValue).format("YYYY, MM, DD");
    console.log(yearMMDD);

    // "2025, 12, 25"; // example: "YYYY, MM, DD"
    const timeHHMM = `${event.target.value.split(":")[0]}:${event.target.value.split(":")[1]}`;
    console.log(timeHHMM);
    // parse
    const [yearStr, monthStr, dayStr] = yearMMDD
      .split(",")
      .map((s) => s.trim());
    const [hourStr, minuteStr] = timeHHMM.split(":").map((s) => s.trim());

    const year = Number(yearStr);
    const month = Number(monthStr); // 1-12
    const day = Number(dayStr);

    console.log(year, month, day);
    const hour = Number(hourStr);
    const minute = Number(minuteStr);
    console.log(hour, minute);

    // Note: JavaScript Date months are 0-based
    const date = new Date(year, month - 1, day, hour, minute, 0, 0);
    console.log(date);

    // Unix timestamp in seconds
    const unixSeconds = Math.floor(date.getTime() / 1000);

    console.log(unixSeconds);
    console.log(dayjs(+unixSeconds * 1000).format("YYYY:MM:DD HH:mm"));
    setDate(date);
  };

  React.useEffect(() => {
    console.log(dateValue);
  }, [dateValue]);

  React.useEffect(() => {
    console.log(
      `${dayjs(dayjs.unix(Number(dateValue))).format(
        "HH"
      )}:${dayjs(dayjs.unix(Number(dateValue))).format("mm")}:00`
    );
  }, [dateValue]);

  return (
    <Card size="sm" className="mx-auto w-fit">
      <CardContent>
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={setDate}
          className="p-0"
        />
      </CardContent>
      <CardFooter className="bg-card border-t">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="time-from">{title}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="time-from"
                type="time"
                step="1"
                value={`${dayjs(dateValue).format("HH")}:${dayjs(dateValue).format("mm")}:00`}
                onChange={handleInputChange}
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
              <InputGroupAddon>
                <Clock2Icon className="text-muted-foreground" />
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </CardFooter>
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
