"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import SelectHabbitListActivities from "@/lib/Hooks/Lists/Habbit/HabbitListActivities.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);
function HabbitList() {
  const { ListHabbitNew, ListMyHabbit, selectedHabbit } = UseHabbitList();
  const { CompleteItem, DelItem, SelectItem } = SelectHabbitListActivities();

  return (
    <>
      <ListSection
        drawerType="HabbitList"
        formType="Add Habbit"
        selectedID={selectedHabbit && !!selectedHabbit.id}
        ListFilteredTilte="Habbit"
        ListForgotTilte="New Habbit"
        ListFilteredCount={FinishedArray(ListMyHabbit).length}
        ListForgotCount={FinishedArray(ListHabbitNew).length}
        ListFiltered={ListMyHabbit as []}
        ListForgot={ListHabbitNew as []}
      />
      <SelectedSection
        drawerType="HabbitList"
        formType="Edit Habbit"
        CompleteItem={() =>
          CompleteItem(selectedHabbit.id, selectedHabbit.title)
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        selectedIsComplete={selectedHabbit && selectedHabbit.isComplete}
        selected={selectedHabbit}
      />
    </>
  );
}

export default HabbitList;
