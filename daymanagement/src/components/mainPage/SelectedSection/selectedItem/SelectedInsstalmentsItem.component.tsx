import { Button } from "@/components/ui/button";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import { Calendar, CheckCircle2, DollarSign } from "lucide-react";

export const SelectedInsstalmentsItem = ({
  id,
  title,
  date,
  isFinish,
  payment,
  isComplete,
  doDate,
}: {
  id: string;
  title: string;
  doDate: number;
  date: number;
  isFinish?: boolean;
  payment: string;
  isComplete: boolean;
  lastupdate: number;
}) => {
  const { CompleteItem } = InstallmentsListActivities();

  return (
    <div className="flex justify-between w-full">
      <div
        className={cn(
          "flex flex-row items-center gap-x-0.5",
          !isComplete ? "text-white" : "text-successGreen"
        )}
      >
        <Calendar width={16} height={16} />
        {DayUnixFormat(+doDate, "YYYY-MM-DD")}
      </div>
      <div
        className={cn(
          "flex flex-row items-center gap-x-0.5",
          !isComplete ? "text-errorRed" : "text-successGreen"
        )}
      >
        <DollarSign width={16} height={16} />
        {payment}
      </div>
      <>
        <Button
          disabled={!isFinish && isComplete}
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            e && (doDate == date || isComplete) && CompleteItem(id, title);
          }}
          className={cn(
            !isFinish
              ? isComplete
                ? "bg-success"
                : doDate != date
                  ? "bg-white/15"
                  : "bg-primary"
              : "bg-white/15"
          )}
        >
          <CheckCircle2 />
        </Button>
      </>
    </div>
  );
};

export default SelectedInsstalmentsItem;
