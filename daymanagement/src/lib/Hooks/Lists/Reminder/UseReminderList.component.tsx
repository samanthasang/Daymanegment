"use client";
import { useAppSelector } from "@/lib/hook";
import { TReminder } from "@/modules/reminderList/reminder.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useReminderList() {
  const Reminder = useAppSelector((state) => state.reminder);

  const selectedReminder = Reminder?.selectedReminder as TReminder;

  const ListReminder = Reminder?.ListReminder as TReminder[];

  const dateFromArray = DateFromFilter([ListReminder] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListReminderFiltered = TagFilter([...categoryArray] as any);

  const ListReminderForgot = ListReminder.filter(
    (a) => +a.date < currentUnixTimestampZero
  );

  return {
    ListReminderFiltered,
    ListReminderForgot,
    ListReminderAll: ListReminder,
    selectedReminder,
  };
}

export default useReminderList;
