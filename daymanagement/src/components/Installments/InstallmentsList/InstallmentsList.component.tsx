"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function InstallmentsList() {
  const {
    ListInstallmentsFiltered,
    ListInstallmentsForgot,
    selectedInstallmentstList,
  } = useInstallmentsList();
  const { CompleteItem, DelItem, SelectItem } = InstallmentsListActivities();

  return (
    <>
      <ListSection
        drawerType="InstallmentsList"
        formType="Add Installment"
        selectedID={selectedInstallmentstList && !!selectedInstallmentstList.id}
        ListFilteredTilte="Installments"
        ListForgotTilte="Old Installments"
        ListFilteredCount={FinishedArray(ListInstallmentsFiltered).length}
        ListForgotCount={FinishedArray(ListInstallmentsForgot).length}
        ListFiltered={ListInstallmentsFiltered as []}
        ListForgot={ListInstallmentsForgot as []}
        withFinish
        withComplateSort
      />
      <SelectedSection
        CompleteItem={() =>
          CompleteItem(
            selectedInstallmentstList.id,
            selectedInstallmentstList.title,
            selectedInstallmentstList.startDate,
            selectedInstallmentstList.doDate
          )
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="InstallmentsList"
        formType="Edit Installment"
        selectedIsComplete={selectedInstallmentstList.isComplete}
        selected={selectedInstallmentstList}
      />
    </>
  );
}

export default InstallmentsList;
