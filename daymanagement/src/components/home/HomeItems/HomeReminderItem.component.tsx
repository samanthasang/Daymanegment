"use client";
import useReminderList from "@/lib/Hooks/Lists/UseReminderList.component";

function HomeReminderItem() {
  const ListReminder = useReminderList();

  return (
    <div className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white">
      <span>Reminder</span>
      <span>{`${ListReminder?.filter((reminder) => reminder.isComplete == true).length} / ${ListReminder?.length}`}</span>
    </div>
  );
}

export default HomeReminderItem;
