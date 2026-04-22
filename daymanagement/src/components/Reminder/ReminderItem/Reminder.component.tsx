"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import { TReminder } from "@/modules/reminderList/reminder.slice";

export const ReminderItem = ({ item }: { item: TReminder }) => {
  const { CompleteItem, DelItem, SelectWithId, UpdateTimeReminderList } =
    ReminderListActivities();
  const { selectedReminder } = useReminderList();

  return (
    <ListItem
      date={item.doDate}
      drawerType="ReminderList"
      selectedID={selectedReminder && selectedReminder.id}
      CompleteItem={() => CompleteItem(item.id, item.title)}
      DelItem={DelItem}
      SelectItem={() => SelectWithId(item.id)}
      UpdateItem={() => UpdateTimeReminderList(item.id, item.title)}
      {...item}
    />
  );
};

export default ReminderItem;
