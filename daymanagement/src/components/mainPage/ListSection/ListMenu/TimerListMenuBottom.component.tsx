import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import { setTimerList } from "@/modules/timerList/timer.slice";
import { TimerIcon } from "lucide-react";

function TimerListMenuBottom() {
  const dispatch = useAppDispatch();

  const StartTimer = () => {
    dispatch(
      setTimerList({
        id: "",
        title: `timer-${currentUnixTimestamp.toString()}`,
        startDate: currentUnixTimestamp,
        endDate: currentUnixTimestamp,
        createDate: currentUnixTimestamp,
        description: "",
        isComplete: false,
        category: "",
        tag: "",
      })
    );
  };

  return (
    <Button variant="default" onClick={() => StartTimer()} className="flex-1">
      <TimerIcon />
    </Button>
  );
}

export default TimerListMenuBottom;
