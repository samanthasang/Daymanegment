"use client";
import MenuItems from "@/components/mainPage/MenuItems/MenuItems.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";

function HomeVisitItem() {
  const { ListVisitFiltered } = useVisitList();

  return (
    <MenuItems
      href={"/visits"}
      tilte="Visits"
      infoNumber={`${ListVisitFiltered?.filter((item) => item.isComplete == true).length} / ${ListVisitFiltered.length}`}
    />
  );
}

export default HomeVisitItem;
