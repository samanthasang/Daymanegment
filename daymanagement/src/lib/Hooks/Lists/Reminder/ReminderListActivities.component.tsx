"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeReminderList,
  delReminderList,
  finishReminderList,
  selectReminderList,
  TReminder,
  updateReminderList,
} from "@/modules/reminderList/reminder.slice";

import { toast } from "react-toastify";
import { DayUnixAdd } from "../../UseDayJS";
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
  const UndoItem = (item: TReminder) => {
    dispatch(
      updateReminderList({
        ...item,
        doDate: item.lastUpdate,
        lastUpdate: DayUnixAdd(item.lastUpdate, "day", -Number(item.timeDiff)),
        isComplete: false,
      })
    );
    item.id && selectedReminder && dispatch(selectReminderList(item.id));
    toast(`${item.title} is updated`);
  };
  return {
    UndoItem,
    CompleteItem,
    DelItem,
    SelectWithId,
    SelectItem,
    FinishItem,
  };
}

export default ReminderListActivities;
