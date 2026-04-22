import { AddTask } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hook";
import { setTimerList } from "@/modules/timerList/timer.slice";

function TimerListMenuBottom() {
  const dispatch = useAppDispatch();

  const StartTimer = () => {
    dispatch(
      setTimerList({
        id: "",
        title: `timer-${Math.floor(new Date().getTime() / 1000).toString()}`,
        startDate: Math.floor(new Date().getTime() / 1000).toString(),
        endDate: Math.floor(new Date().getTime() / 1000).toString(),
        isComplete: false,
        category: "",
        tag: "",
      })
    );
  };

  return (
    <Button
      variant="outline"
      onClick={() => StartTimer()}
      className="flex justify-center items-center h-10 flex-1 rounded-full hover:bg-button/15 w-full cursor-pointer"
    >
      <AddTask />
    </Button>
  );
}

export default TimerListMenuBottom;
