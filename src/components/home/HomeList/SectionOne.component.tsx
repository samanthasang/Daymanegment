"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";

function SectionOne() {
  const { ListTimerFiltered } = useTimerList();
  const { ListVisitFiltered } = useVisitList();

  return (
    <ListSection
      drawerType="Timers"
      formType="Add"
      drawerTitle="Timer"
      selectedID={false}
      ListFilteredTilte="Timers"
      ListForgotTilte="Visits"
      ListFilteredCount={ListTimerFiltered.length}
      ListForgotCount={ListVisitFiltered.length}
      ListFiltered={ListTimerFiltered as []}
      ListForgot={ListVisitFiltered as []}
    />
  );
}

export default SectionOne;
