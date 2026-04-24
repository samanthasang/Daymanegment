"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  completeReminderList,
  delReminderList,
  finishReminderList,
  selectReminderList,
  TReminder,
  unFinishReminderList,
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
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeReminderList(id));
    id && selectedselectedReminder && dispatch(selectReminderList(id));
    toast(`${title} is updated`);
  };
  const FinishItem = (id: string, title: string) => {
    dispatch(finishReminderList(id));
    id && selectedselectedReminder && dispatch(selectReminderList(id));
    toast(`${title} is updated`);
  };
  const UnFinishItem = (id: string, title: string) => {
    dispatch(unFinishReminderList(id));
    SelectItem();
    toast(`${title} is updated`);
  };
  return {
    UnFinishItem,
    CompleteItem,
    DelItem,
    SelectWithId,
    SelectItem,
    FinishItem,
  };
}

export default ReminderListActivities;
