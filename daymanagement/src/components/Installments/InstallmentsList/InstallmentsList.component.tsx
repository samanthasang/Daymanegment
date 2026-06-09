"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
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
  const { CompleteItem, DelItem, SelectItem, UndoItem } =
    InstallmentsListActivities();
  const t: any = UseLangComponent("Installments");

  return (
    <>
      <ListSection
        drawerType="Installments"
        formType="Add"
        drawerTitle={t.single}
        selectedID={selectedInstallmentstList && !!selectedInstallmentstList.id}
        ListFilteredTilte={t.title}
        ListForgotTilte={t.forgotTilte}
        ListFilteredCount={FinishedArray(ListInstallmentsFiltered).length}
        ListForgotCount={FinishedArray(ListInstallmentsForgot).length}
        ListFiltered={ListInstallmentsFiltered as []}
        ListForgot={ListInstallmentsForgot as []}
        withFinish
        withComplateSort
      />
      <SelectedSection
        drawerType="Installments"
        formType="Edit"
        drawerTitle={t.single}
        CompleteItem={() =>
          CompleteItem(
            selectedInstallmentstList.id,
            selectedInstallmentstList.title
          )
        }
        DelItem={() =>
          DelItem(selectedInstallmentstList.id, selectedInstallmentstList.title)
        }
        SelectItem={SelectItem}
        UndoneItem={() =>
          UndoItem(
            selectedInstallmentstList.id,
            selectedInstallmentstList.title
          )
        }
        isComplete={
          selectedInstallmentstList && selectedInstallmentstList.isComplete
        }
        selected={selectedInstallmentstList}
      />
    </>
  );
}

export default InstallmentsList;
