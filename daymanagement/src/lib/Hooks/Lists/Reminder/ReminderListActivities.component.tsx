"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  completeReminderList,
  delReminderList,
  selectReminderList,
  TReminder,
  updateTimeReminderList,
} from "@/modules/reminderList/reminder.slice";

import { toast } from "react-toastify";

function ReminderListActivities() {
  const dispatch = useAppDispatch();

  const Reminder = useAppSelector((state) => state.reminder);

  const selectedselectedReminder = Reminder?.selectedReminder as TReminder;

  const SelectItem = () => {
    dispatch(selectReminderList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectReminderList(id));
  };
  const DelItem = () => {
    dispatch(delReminderList(selectedselectedReminder.id));
    SelectItem();
    toast(`${selectedselectedReminder.title} is deleted`);
  };
  const CompleteItemt = (id: string, title: string) => {
    dispatch(completeReminderList(id));
    id && selectedselectedReminder && dispatch(selectReminderList(id));
    toast(`${title} is updated`);
  };
  const UpdateTimeReminderList = (id: string, title: string) => {
    dispatch(updateTimeReminderList(id));
    SelectItem();
    toast(`${title} is updated`);
  };
  return {
    UpdateTimeReminderList,
    CompleteItemt,
    DelItem,
    SelectWithId,
    SelectItem,
  };
}

export default ReminderListActivities;
