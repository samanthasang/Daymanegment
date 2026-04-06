"use client";
import { useAppSelector } from "@/lib/hook";
import { TTimer } from "@/modules/timerList/timer.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import EndDateToFilter from "../../Filters/EndDateToFilter";
import StartDateToFilter from "../../Filters/StartDateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useTimerList() {
  const Timer = useAppSelector((state) => state.TimerList);

  const selectedTimer = Timer?.selectedTimer as TTimer;
  const ListTimer = Timer?.ListTimer as TTimer[];

  const dateFromArray = StartDateToFilter([...ListTimer] as any);

  const dateToArray = EndDateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListTimerFiltered = TagFilter([...categoryArray] as any);

  const ListTimerForgot = ListTimer.filter(
    (a) => +a.startDate < currentUnixTimestampZero
  );

  return {
    ListTimerFiltered,
    ListTimerAll: ListTimer,
    ListTimerForgot,
    selectedTimer,
  };
}

export default useTimerList;
