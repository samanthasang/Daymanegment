"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import {
  TReminder
} from "@/modules/reminderList/reminder.slice";

export const ReminderItem = ({
  item,
  selectedID,
}: {
  item: TReminder;
  selectedID?: string;
}) => {
  const { CompleteItemt, DelItem, SelectWithId, UpdateTimeReminderList } =
    ReminderListActivities();

  return (
    <ListItem
      id={item.id}
      priority={item.priority}
      title={item.title}
      category={item.category}
      tag={item.tag}
      isComplete={item.isComplete}
      date={item.date}
      drawerType="ReminderList"
      formType="Edit Reminder"
      selectedID={selectedID}
      CompleteItemt={() => CompleteItemt(item.id, item.title)}
      DelItem={DelItem}
      SelectItem={() => SelectWithId(item.id)}
      UpdateItem={() => UpdateTimeReminderList(item.id, item.title)}
    />
  );
};

export default ReminderItem;
