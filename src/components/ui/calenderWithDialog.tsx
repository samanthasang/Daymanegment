import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DayPicker } from "react-day-picker";
import { Calender } from "../icons";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { CalendarPersian } from "./calendarPersian";
import { useAppSelector } from "@/lib/hook";

export function CalendarDialog({
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
  const { lang } = useAppSelector((state) => state.Menu);

  const [isOpen, setIsOpen] = React.useState(false);
  const t: any = UseLangComponent("Form");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="text-red-400 w-8 h-8 flex justify-center items-center rounded-r-xl border border-border bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
          <Calender />
        </div>
      </DialogTrigger>
      <DialogContent className="w-fit p-3 bg-secondary backdrop-filter backdrop-blur-[10px] rounded-[16px] border-[1px] border-solid border-[rgba(255,255,255,0.35)] [box-shadow:0_8px_32px_0_rgba(31,_38,_135,_0.1)]">
        <DialogHeader>
          <DialogTitle
            className={
              lang == "en" ? " w-full text-left" : " w-full text-right "
            }
          >
            {t.PickDate}
          </DialogTitle>
        </DialogHeader>
        <Input
          value={dateValue ? dateValue.toLocaleDateString() : ""}
          readOnly
          placeholder={t.PickDate}
        />
        {lang == "en" ? (
          <Calendar mode="single" selected={dateValue} onSelect={setDate} />
        ) : (
          <CalendarPersian
            mode="single"
            selected={dateValue}
            onSelect={setDate}
          />
        )}
        <Button onClick={() => setIsOpen(false)} className="w-full">
          {t.Close}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
