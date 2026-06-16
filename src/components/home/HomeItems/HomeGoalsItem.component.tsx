"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";

function HomeGoalsItem() {
  const { ListGoalsFiltered } = useGoalsList();

  return (
    <MenuItems
      href={"/goals"}
      title="Goals"
      infoNumber={`${FinishedArray(ListGoalsFiltered).length} / ${ListGoalsFiltered?.length}`}
    />
  );
}

export default HomeGoalsItem;
