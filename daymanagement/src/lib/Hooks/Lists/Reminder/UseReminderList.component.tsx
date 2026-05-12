"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  TReminder,
  unFinishReminderList,
} from "@/modules/reminderList/reminder.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero, DayUnixDiff } from "../../UseDayJS";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";
import { useEffect } from "react";
import { QUnitType } from "dayjs";

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
  };
}

export default useReminderList;
