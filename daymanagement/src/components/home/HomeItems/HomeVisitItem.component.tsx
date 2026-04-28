"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";

function HomeVisitItem() {
  const { ListVisitFiltered } = useVisitList();

  return (
    <MenuItems
      href={"/visits"}
      tilte="Visits"
      infoNumber={`${FinishedArray(ListVisitFiltered).length} / ${ListVisitFiltered?.length}`}
    />
  );
}

export default HomeVisitItem;
