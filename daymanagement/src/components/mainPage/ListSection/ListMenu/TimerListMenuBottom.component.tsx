"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import { setTimerList } from "@/modules/timerList/timer.slice";
import dayjs from "dayjs";
import { Timer } from "lucide-react";

function TimerListMenuBottom() {
  const dispatch = useAppDispatch();

  const StartTimer = () => {
    dispatch(
      setTimerList({
        id: "",
        title: `timer-${dayjs(Math.floor(new Date().getTime())).unix()}`,
        startDate: dayjs(Math.floor(new Date().getTime())).unix(),
        endDate: dayjs(Math.floor(new Date().getTime())).unix(),
        description: "",
        isComplete: false,
        category: "",
        tag: "",
      })
    );
  };

  return (
    <Button variant="default" onClick={() => StartTimer()} className="flex-1">
      <Timer />
    </Button>
  );
}

export default TimerListMenuBottom;
