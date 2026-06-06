"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { TTimer, updateTimerList } from "@/modules/timerList/timer.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import EndDateToFilter from "../../Filters/EndDateToFilter";
import StartDateToFilter from "../../Filters/StartDateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import StartDateOrderMinusFilter from "../../ListFilter/StartDateOrderMinusFilter.component";
import StartDateOrderPlusFilter from "../../ListFilter/StartDateOrderPlusFilter.component";
import {
  currentUnixTimestampZero,
  TomorrowUnixTimestampZero,
} from "../../UseDayJS";
import { useEffect } from "react";

function useTimerList() {
  const Timer = useAppSelector((state) => state.Timers);

  const selectedTimer = Timer?.selectedTimer as TTimer;
  const ListTimer = Timer?.ListTimer as TTimer[];

  const dateFromArray = StartDateToFilter([...ListTimer] as any);

  const dateToArray = EndDateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListTimerFiltered = TagFilter([...categoryArray] as any);

  const ListTimerForgot = ListTimer.filter(
    (a) => +a.startDate < currentUnixTimestampZero
  );
  const ListTimerToday = ListTimer.filter(
    (a) =>
      +a.startDate >= currentUnixTimestampZero &&
      +a.startDate < TomorrowUnixTimestampZero
  );
  const ListTimerForgotComplete = ListTimerForgot.filter((a) => a.isComplete);
  const ListTimerForgotNotComplete = ListTimerForgot.filter(
    (a) => !a.isComplete
  );

  const oldCategoryArray = CategoryFilter([...ListTimerForgotComplete] as any);

  const oldListTimerFiltered = TagFilter([...oldCategoryArray] as any);

  const dateUpOrderArray: TTimer[] = StartDateOrderPlusFilter([
    ...ListTimerFiltered,
    ...ListTimerForgotNotComplete,
  ]);
  const dateDOwnOrderArray: TTimer[] =
    StartDateOrderMinusFilter(oldListTimerFiltered);

  const dispatch = useAppDispatch();
  useEffect(() => {
    ListTimer.map((li) =>
      dispatch(
        updateTimerList({
          ...li,
        })
      )
    );
  }, []);
  return {
    ListTimerFiltered: dateUpOrderArray,
    ListTimerAll: ListTimer,
    ListTimerForgot: dateDOwnOrderArray,
    selectedTimer,
    ListTimerToday,
  };
}

export default useTimerList;
