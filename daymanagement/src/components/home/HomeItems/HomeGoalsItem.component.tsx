"use client";
import MenuItems from "@/components/mainPage/MenuItems/MenuItems.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";

function HomeGoalsItem() {
  const { ListGoalsFiltered } = useGoalsList();

  return (
    <MenuItems
      href={"/goals"}
      tilte="Goals"
      infoNumber={`${ListGoalsFiltered?.filter((todo) => todo.isComplete == true).length} / ${ListGoalsFiltered?.length}`}
    />
  );
}

export default HomeGoalsItem;
