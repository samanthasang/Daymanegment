"use client"
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setTimerList, TTimer } from "@/modules/timerList/timer.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect } from "react";
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);


const currentUnixTimestamp = dayjs().unix();
export default function AddTimerButton() {

    const { ListTimer }: {
        ListTimer: TTimer[];
        selectedTimer: {};
    } = useAppSelector((state) => state.TimerList) || [];
    
    useEffect(() => {
    console.log(ListTimer);
    }, [ListTimer]);
  
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    console.log("onSubmit", dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("YYYY-MM-DD HH:MM"));
    
      dispatch(setTimerList({
        id: "",
        title: `timer${ListTimer.length}`,
        startDate: currentUnixTimestamp,
        endDate: currentUnixTimestamp,
        isComplete: false
      }))
  };
  return (
    <div className="col-span-1 w-full">
        <Button onClick={() => onSubmit()} type="submit" className="rounded-full h-64 cursor-pointer w-64 mt-10 mx-auto text-white bg-background border border-white">submit</Button>
    </div>
  );
}