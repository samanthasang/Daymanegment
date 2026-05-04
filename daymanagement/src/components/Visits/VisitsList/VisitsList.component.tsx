"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import VisitListActivities from "@/lib/Hooks/Lists/Visit/VisitListActivities.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function VisitsList() {
  const { ListVisitFiltered, ListVisitForgot, selectedVisit } = useVisitList();
  const { CompleteItem, DelItem, SelectItem } = VisitListActivities();

  return (
    <>
      <ListSection
        drawerType="Visits"
        formType="Add"
        drawerTitle="Visit"
        selectedID={selectedVisit && !!selectedVisit.id}
        ListFilteredTilte="Visits"
        ListForgotTilte="Old Visits"
        ListFilteredCount={FinishedArray(ListVisitFiltered).length}
        ListForgotCount={FinishedArray(ListVisitForgot).length}
        ListFiltered={ListVisitFiltered as []}
        ListForgot={ListVisitForgot as []}
        withFinish
        withComplateSort
      />
      <SelectedSection
        drawerType="Visits"
        formType="Edit"
        drawerTitle={selectedVisit.title}
        isComplete={(selectedVisit && selectedVisit.isComplete) || false}
        time={selectedVisit && selectedVisit.doDate}
        CompleteItem={() => CompleteItem(selectedVisit.id, selectedVisit.title)}
        DelItem={() => DelItem()}
        SelectItem={() => SelectItem()}
        DuplicateItem
        selected={selectedVisit}
      />
    </>
  );
}

export default VisitsList;
