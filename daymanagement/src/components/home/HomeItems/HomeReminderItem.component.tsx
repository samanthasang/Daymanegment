"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";

function HomeReminderItem() {
  const { ListReminderFiltered } = useReminderList();

  return (
    <MenuItems
      href={"/reminder"}
      tilte="Reminder"
      infoNumber={`${ListReminderFiltered?.filter((reminder) => reminder.isComplete == true).length} / ${ListReminderFiltered?.length}`}
    />
  );
}

export default HomeReminderItem;
