"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";

function HomeReminderItem({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListReminder = useReminderList();

  return (
    <MenuItems
      href={"/reminder"}
      tilte="Reminder"
      className={
        pathname && pathname.startsWith("/reminder") ? "bg-primary" : ""
      }
      infoNumber={
        OpenMenu
          ? `${ListReminder?.filter((reminder) => reminder.isComplete == true).length} / ${ListReminder?.length}`
          : ""
      }
    />
  );
}

export default HomeReminderItem;
