"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeTimerList,
  delTimerList,
  selectTimerList,
} from "@/modules/timerList/timer.slice";
import { toast } from "react-toastify";
import useTimerList from "./UseTimerList.component";

function TimerListActivities() {
  const dispatch = useAppDispatch();

  const { selectedTimer } = useTimerList();

  const SelectItem = () => {
    dispatch(selectTimerList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectTimerList(id));
  };
  const DelItem = (id: string, title: string) => {
    dispatch(delTimerList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(
      completeTimerList({
        id: id,
        endDate: Math.floor(new Date().getTime() / 1000.0),
      })
    );
    id && selectedTimer && dispatch(selectTimerList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem };
}

export default TimerListActivities;
