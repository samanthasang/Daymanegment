"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";

function HomeTimerItem() {
  const { ListTimerFiltered } = useTimerList();

  return (
    <MenuItems
      href={"/timers"}
      tilte="Timers"
      infoNumber={`${FinishedArray(ListTimerFiltered).length} / ${ListTimerFiltered?.length}`}
    />
  );
}

export default HomeTimerItem;
