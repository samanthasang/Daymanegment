"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import {
  completeReminderList,
  delReminderList,
  selectReminderList,
  TReminder,
  updateTimeReminderList,
} from "@/modules/reminderList/reminder.slice";
import { toast } from "react-toastify";

export const ReminderItem = ({
  item,
  selectedID,
}: {
  item: TReminder;
  selectedID?: string;
}) => {
  const dispatch = useAppDispatch();

  const SelectReminderList = () => {
    dispatch(selectReminderList(item.id));
  };
  const DelReminderList = () => {
    dispatch(delReminderList(item.id));
    toast(`${item.title} is deleted`);
  };
  const UpdateTimeReminderList = () => {
    dispatch(updateTimeReminderList(item.id));
    SelectReminderList();
    toast(`${item.title} is updated`);
  };
  const CompleteReminderList = () => {
    dispatch(completeReminderList(item.id));
    SelectReminderList();
    item.isComplete
      ? toast(`${item.title} is uncompleted`)
      : toast(`${item.title} is completed`);
  };
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
      SelectItem={SelectReminderList}
      DelItem={DelReminderList}
      CompleteItemt={CompleteReminderList}
      UpdateItem={UpdateTimeReminderList}
    />
  );
};

export default ReminderItem;
