"use client";
import MenuItems from "@/components/mainPage/MenuItems/MenuItems.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";

function HomeTimerItem() {
  const { ListTimerFiltered } = useTimerList();

  return (
    <MenuItems
      href={"/timer"}
      tilte="Timer"
      infoNumber={`${ListTimerFiltered?.filter((todo) => todo.isComplete == true).length} / ${ListTimerFiltered?.length}`}
    />
  );
}

export default HomeTimerItem;
