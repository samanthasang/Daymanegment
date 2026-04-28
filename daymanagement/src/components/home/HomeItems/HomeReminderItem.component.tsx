"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";

function HomeReminderItem() {
  const { ListReminderFiltered } = useReminderList();

  return (
    <MenuItems
      href={"/reminder"}
      tilte="Reminder"
      infoNumber={`${FinishedArray(ListReminderFiltered).length} / ${ListReminderFiltered?.length}`}
    />
  );
}

export default HomeReminderItem;
