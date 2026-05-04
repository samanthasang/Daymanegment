"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeReminderList,
  delReminderList,
  finishReminderList,
  selectReminderList,
  unFinishReminderList
} from "@/modules/reminderList/reminder.slice";

import { toast } from "react-toastify";
import useReminderList from "./UseReminderList.component";

function ReminderListActivities() {
  const dispatch = useAppDispatch();

  const { selectedReminder } = useReminderList();

  const SelectItem = () => {
    dispatch(selectReminderList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectReminderList(id));
  };
  const DelItem = () => {
    dispatch(delReminderList(selectedReminder.id));
    SelectItem();
    toast(`${selectedReminder.title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeReminderList(id));
    id && selectedReminder && dispatch(selectReminderList(id));
    toast(`${title} is updated`);
  };
  const FinishItem = (id: string, title: string) => {
    dispatch(finishReminderList(id));
    id && selectedReminder && dispatch(selectReminderList(id));
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
