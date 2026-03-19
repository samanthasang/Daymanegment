"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";

function HomeGoalsItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListGoals = useGoalsList();

  return (
    <MenuItems
      href={"/goals"}
      tilte="Goals"
      className={pathname && pathname.startsWith("/goals") ? "bg-primary" : ""}
      infoNumber={
        OpenMenu
          ? `${ListGoals?.filter((todo) => todo.isComplete == true).length} / ${ListGoals?.length}`
          : ""
      }
    />
  );
}

export default HomeGoalsItem;
