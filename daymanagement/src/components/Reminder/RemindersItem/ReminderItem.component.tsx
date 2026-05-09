"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import ReminderListActivities from "@/lib/Hooks/Lists/Reminder/ReminderListActivities.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import {
  TReminder,
  unFinishReminderList,
} from "@/modules/reminderList/reminder.slice";
import { QUnitType } from "dayjs";
import { useEffect } from "react";

export const ReminderItem = ({ item }: { item: TReminder }) => {
  const dispatch = useAppDispatch();
  const { CompleteItem, DelItem, SelectWithId, PauseItem } =
    ReminderListActivities();
  const { selectedReminder } = useReminderList();
  useEffect(() => {
    item.isComplete &&
      DayUnixDiff(item.doDate, item.priodDiff as QUnitType) < 1 &&
      dispatch(unFinishReminderList(item.id));
  }, []);
  return (
    <ListItem
      date={item.doDate}
      drawerType="Reminders"
      selectedID={selectedReminder && selectedReminder.id}
      CompleteItem={() => CompleteItem(item.id, item.title)}
      DelItem={() => DelItem(item.id, item.title)}
      SelectItem={() => SelectWithId(item.id)}
      UpdateItem={() => PauseItem(item.id, item.title)}
      {...item}
    />
  );
};

export default ReminderItem;
