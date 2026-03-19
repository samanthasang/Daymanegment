"use client";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import {
  TReminder
} from "@/modules/reminderList/reminder.slice";

function SelectedReminderList() {

  const Reminder = useAppSelector((state) => state.reminder);

  const { CompleteItemt, DelItem, SelectItem } =
    ReminderListActivities();

  const selectedReminder = Reminder?.selectedReminder as TReminder;

  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
      <SelectedItem
        drawerType="ReminderList"
        CompleteItemt={() =>
          CompleteItemt(selectedReminder.id, selectedReminder.title)
        }
        {...selectedReminder}
      />
      <SelectedMenuBottom
        CompleteItemt={() =>
          CompleteItemt(selectedReminder.id, selectedReminder.title)
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="ReminderList"
        formType="Edit Reminder"
        selectedIsComplete={selectedReminder.isComplete}
      />
    </div>
  );
}

export default SelectedReminderList;
