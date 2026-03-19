"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  completeTimerList,
  delTimerList,
  selectTimerList,
  TTimer,
} from "@/modules/timerList/timer.slice";
import { toast } from "react-toastify";

function TimerListActivities() {
  const dispatch = useAppDispatch();

  const Timer = useAppSelector((state) => state.TimerList);

  const selectedTimer = Timer?.selectedTimer as TTimer;

  const SelectItem = () => {
    dispatch(selectTimerList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectTimerList(id));
  };
  const DelItem = () => {
    dispatch(delTimerList(selectedTimer.id));
    SelectItem();
    toast(`${selectedTimer.title} is deleted`);
  };
  const CompleteItemt = (id: string, title: string) => {
    dispatch(
      completeTimerList({
        id: id,
        endDate: Math.floor(new Date().getTime()).toString(),
      })
    );
    id && selectedTimer && dispatch(selectTimerList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItemt, DelItem, SelectWithId, SelectItem };
}

export default TimerListActivities;
