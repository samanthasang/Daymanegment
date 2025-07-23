"use client"
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { setTimerList, TTimer } from "@/modules/timerList/timer.slice";
import { useEffect } from "react";

interface IFormInputs {
    id?: any
    title: string
    startDate: string
    endDate: string
    isComplete: boolean
}

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
    console.log("onSubmit");
    
      dispatch(setTimerList({
        id: "",
        title: `timer${ListTimer.length}`,
        startDate: `${Math.floor(Date.now() / 1000)}`,
        endDate: `${Math.floor(Date.now() / 1000)}`,
        isComplete: false
      }))
  };
  return (
    <div className="col-span-1 w-full">
        <Button onClick={() => onSubmit()} type="submit" className="rounded-full h-64 cursor-pointer w-64 mt-10 mx-auto text-white bg-background border border-white">submit</Button>
    </div>
  );
}