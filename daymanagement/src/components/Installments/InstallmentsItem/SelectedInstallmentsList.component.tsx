"use client";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";

function SelectedInstallmentsList() {
  const Installmentst = useAppSelector((state) => state.InstallmentstList);

  const { CompleteItemt, DelItem, SelectItem } = InstallmentsListActivities();

  const selectedInstallmentstList =
    Installmentst?.selectedInstallmentst as TInstallmentsts;

  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
      <SelectedItem
        {...selectedInstallmentstList}
        date={
          selectedInstallmentstList.installmentstList.filter(
            (ins) => !ins.isComplete
          )[0]
            ? selectedInstallmentstList.installmentstList.filter(
                (ins) => !ins.isComplete
              )[0].date
            : selectedInstallmentstList.lastUpdate
        }
      />
      <SelectedMenuBottom
        CompleteItemt={() =>
          CompleteItemt(
            selectedInstallmentstList.id,
            selectedInstallmentstList.title,
            selectedInstallmentstList.startDate
          )
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="InstallmentsList"
        formType="Edit Installment"
        selectedIsComplete={selectedInstallmentstList.isComplete}
      />
    </div>
  );
}

export default SelectedInstallmentsList;
