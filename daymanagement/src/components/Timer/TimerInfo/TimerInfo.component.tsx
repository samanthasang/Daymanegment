"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { useState } from "react";

function TimerInfo() {
  const [forgot, setForgot] = useState(false);
  const { ListTimerFiltered, ListTimerForgot, ListTimerAll } = useTimerList();

  const TimersLenght = ListTimerFiltered.length;
  const TimersFinishLenght = NotFinishedArray(ListTimerFiltered).length;
  const TimersNotFinishLenght = FinishedArray(ListTimerFiltered).length;
  const TimersTodayLenght = ListTimerAll.filter(
    (item) =>
      item.startDate >= currentUnixTimestampZero &&
      item.startDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1)
  );
  const TimersStartTimeArray = ListTimerFiltered?.reduce((acc, obj) => {
    if (obj.isComplete && obj.startDate) {
      return acc + +obj.startDate;
    }
    return acc;
  }, 0);
  const TimersEndTimeArray = ListTimerFiltered?.reduce((acc, obj) => {
    if (obj.isComplete && obj.endDate) {
      return acc + +obj.endDate;
    }
    return acc;
  }, 0);

  const startD = dayjs.unix(TimersStartTimeArray);
  const endD = dayjs.unix(TimersEndTimeArray);
  const diff = dayjs.duration(endD.diff(startD));

  const TodayTimersFinishLenght = NotFinishedArray(TimersTodayLenght).length;
  const TodayTimersNotFinishLenght = FinishedArray(TimersTodayLenght).length;

  const OldTimersLenght = ListTimerForgot.length;
  const OldTimersFinishLenght = NotFinishedArray(ListTimerForgot).length;
  const OldTimersNotFinishLenght = FinishedArray(ListTimerForgot).length;
  const oldTimersStartTimeArray = ListTimerForgot?.reduce((acc, obj) => {
    if (obj.isComplete && obj.startDate) {
      return acc + +obj.startDate;
    }
    return acc;
  }, 0);
  const oldTimersEndTimeArray = ListTimerForgot?.reduce((acc, obj) => {
    if (obj.isComplete && obj.endDate) {
      return acc + +obj.endDate;
    }
    return acc;
  }, 0);

  const oldStartD = dayjs.unix(oldTimersStartTimeArray);
  const oldEndD = dayjs.unix(oldTimersEndTimeArray);
  const oldDiff = dayjs.duration(oldEndD.diff(oldStartD));

  return (
    <div className="w-full min-w-96 flex flex-col gap-y-2">
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={"Timers"}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={"Old Timers"}
        />
      </ListTitleContainer>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>All Timers :</span>
        {!forgot ? TimersLenght : OldTimersLenght}
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>Done Status :</span>
        <div className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5">
          <span className="text-successGreen border-r-[1px] pr-1 border-blue-500">
            {!forgot ? TimersFinishLenght : OldTimersFinishLenght}
          </span>
          <span className="text-errorRed">
            {!forgot ? TimersNotFinishLenght : OldTimersNotFinishLenght}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>Done Timers :</span>
        <label>
          {!forgot ? (
            <>
              {diff.years() > 0 && `${diff.years()} : `}
              {diff.months() > 0 && `${diff.months()} : `}
              {diff.days() > 0 && `${diff.days()} : `}
              {diff.hours() > 0 && `${diff.hours()} : `}
              {diff.minutes() > 0 && `${diff.minutes()} : `}
              {diff.seconds() < 10 ? `0${diff.seconds()}` : `${diff.seconds()}`}
            </>
          ) : (
            <>
              {oldDiff.years() > 0 && `${oldDiff.years()} : `}
              {oldDiff.months() > 0 && `${oldDiff.months()} : `}
              {oldDiff.days() > 0 && `${oldDiff.days()} : `}
              {oldDiff.hours() > 0 && `${oldDiff.hours()} : `}
              {oldDiff.minutes() > 0 && `${oldDiff.minutes()} : `}
              {oldDiff.seconds() < 10
                ? `0${oldDiff.seconds()}`
                : `${oldDiff.seconds()}`}
            </>
          )}
        </label>
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>Today Timers :</span>
        <div className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5">
          <span className="text-successGreen border-r-[1px] pr-1 border-blue-500">
            {TodayTimersFinishLenght}
          </span>
          <span className="text-errorRed">{TodayTimersNotFinishLenght}</span>
        </div>
      </div>
    </div>
  );
}

export default TimerInfo;
