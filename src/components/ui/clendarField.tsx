import { DialogTrigger } from "@radix-ui/react-dialog";
import React from "react";
import { DayPicker } from "react-day-picker";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";
import { Calender } from "../icons";
import { Button } from "./button";
import { ClendarButtonGroup } from "./ClendarButtonGroup";

export function CalendarField({
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
  errors,
  description,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
  dateValue: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  title: string;
  description?: string;
  errors?: boolean;
}) {
  return (
    <ClendarButtonGroup
      errors={errors || false}
      dateValue={dateValue}
      description={description}
    >
      <DrawerDialogDemo drawerType={"TagList"} formType="Add" drawerTitle="Tag">
        <DialogTrigger asChild>
          <div className="text-red-400 w-8 h-8 flex justify-center items-center rounded-r-xl border border-border bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <Calender />
          </div>
        </DialogTrigger>
      </DrawerDialogDemo>
    </ClendarButtonGroup>
  );
}
