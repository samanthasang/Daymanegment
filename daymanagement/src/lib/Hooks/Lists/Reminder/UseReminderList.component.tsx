"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  TReminder,
  unFinishReminderList
} from "@/modules/reminderList/reminder.slice";
import { QUnitType } from "dayjs";
import { useEffect } from "react";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import {
  currentUnixTimestampZero,
  DayUnixDiff,
  TomorrowUnixTimestampZero,
} from "../../UseDayJS";

function useReminderList() {
  const dispatch = useAppDispatch();
  const Reminder = useAppSelector((state) => state.Reminders);

  const selectedReminder = Reminder?.selectedReminder as TReminder;
  const ListReminder = Reminder?.ListReminder as TReminder[];

  const dateFromArray = DateFromFilter([...ListReminder] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListReminderFiltered = TagFilter([...categoryArray] as any);

  const ListReminderForgot = ListReminder.filter(
    (a) => +a.doDate < currentUnixTimestampZero
  );
  const ListReminderToday = ListReminder.filter(
    (a) =>
      +a.doDate >= currentUnixTimestampZero &&
      +a.doDate < TomorrowUnixTimestampZero
  );

  const oldCategoryArray = CategoryFilter([...ListReminderForgot] as any);

  const OldListReminderFiltered = TagFilter([...oldCategoryArray] as any);

  const dateUpOrderArray: TReminder[] =
    DatePlusOrderFilter(ListReminderFiltered);
  const dateDOwnOrderArray: TReminder[] = DateMinusOrderFilter(
    OldListReminderFiltered
  );

  useEffect(() => {
    ListReminder.map(
      (item) =>
        item.isComplete &&
        DayUnixDiff(item.doDate, item.priodDiff as QUnitType) < 1 &&
        dispatch(unFinishReminderList(item.id))
    );
  }, []);

  return {
    ListReminderFiltered: dateUpOrderArray,
    ListReminderForgot: dateDOwnOrderArray,
    ListReminderAll: ListReminder,
    selectedReminder,
    ListReminderToday,
  };
}

export default useReminderList;
