"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";

function HomeTimerItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListTimer = useTimerList();

  return (
    <MenuItems
      href={"/timer"}
      tilte="Timer"
      className={pathname && pathname.startsWith("/timer") ? "bg-primary" : ""}
      infoNumber={
        OpenMenu
          ? `${ListTimer?.filter((todo) => todo.isComplete == true).length} / ${ListTimer?.length}`
          : ""
      }
    />
  );
}

export default HomeTimerItem;
