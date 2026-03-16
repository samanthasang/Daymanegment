import BasicSwitch from "@/components/ui/BasicSwitch";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import dayjs from "dayjs";

export const SelectedInsstalmentsItem = ({
  id,
  title,
  date,
  last,
  payment,
  isComplete,
}: {
  id: string;
  title: string;
  date: string;
  last?: boolean;
  payment: string;
  isComplete: boolean;
}) => {
  const { CompleteItemt, CompleteItemInstallment } =
    InstallmentsListActivities();

  return (
    <div className="flex justify-between w-full">
      <label>
        {/* <Eye /> */}
        {dayjs(dayjs.unix(Number(date))).format("YYYY-MM-DD")}
      </label>
      <label>{payment}</label>
      <BasicSwitch
        checked={isComplete || false}
        handleToggle={(e) => {
          e && e.preventDefault() && e.stopPropagation();
          !isComplete && CompleteItemt(id, title, date);
          last && CompleteItemInstallment(id, title);
        }}
        label=""
        key={"isComplete"}
      />
    </div>
  );
};

export default SelectedInsstalmentsItem;
