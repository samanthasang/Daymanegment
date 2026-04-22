import { Done } from "@/components/icons";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

export const SelectedInsstalmentsItem = ({
  id,
  title,
  createDate,
  last,
  payment,
  isComplete,
  doDate,
  lastupdate,
}: {
  id: string;
  title: string;
  doDate: number;
  createDate: number;
  last?: boolean;
  payment: string;
  isComplete: boolean;
  lastupdate: number;
}) => {
  const { CompleteItem, CompleteItemInstallment } =
    InstallmentsListActivities();

  return (
    <div className="flex justify-between w-full">
      <label>
        {/* <Eye /> */}
        {dayjs(dayjs.unix(Number(doDate))).format("YYYY-MM-DD")}
      </label>
      <label className={!isComplete ? "text-white" : "text-success"}>
        {payment}
      </label>
      {/* <BasicSwitch
        checked={(disable && isComplete) || false}
        handleToggle={(e) => {
          e && e.preventDefault() && e.stopPropagation();
          !disable && !isComplete && CompleteItem(id, title, date);
          last && CompleteItemInstallment(id, title);
        }}
        label=""
        key={"isComplete"}
      /> */}
      <>
        <div
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            e &&
              (!(doDate != createDate && doDate != lastupdate) || isComplete) &&
              CompleteItemInstallment(id, title);
            e && last && CompleteItem(id, title, doDate, createDate);
          }}
          className={cn(
            "h-8 w-8 min-w-8 flex justify-center items-center rounded-full hover:bg-card/15 cursor-pointer",
            !isComplete
              ? !(doDate != createDate && doDate != lastupdate)
                ? "bg-primary"
                : "bg-white/15"
              : "bg-success"
          )}
        >
          <Done />
        </div>
      </>
    </div>
  );
};

export default SelectedInsstalmentsItem;
