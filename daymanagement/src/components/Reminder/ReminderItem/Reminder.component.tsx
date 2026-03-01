"use client";
import { CheckCircle, CheckMark } from "@/components/icons";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import {
  completeReminderList,
  delReminderList,
  selectReminderList,
  TReminder,
  updateTimeReminderList,
} from "@/modules/reminderList/reminder.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const ReminderItem = ({ item }: { item: TReminder }) => {
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
    toast(`${item.title} is updated`);
  };
  const CompleteReminderList = () => {
    dispatch(completeReminderList(item.id));
    item.isComplete
      ? toast(`${item.title} is uncompleted`)
      : toast(`${item.title} is completed`);
  };
  return (
    <>
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
        SelectItem={SelectReminderList}
        DelItem={DelReminderList}
        CompleteItemt={CompleteReminderList}
        UpdateItem={UpdateTimeReminderList}
      />
    </>
  );
};

export default ReminderItem;
