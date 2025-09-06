"use client"
import { TTimer } from "@/modules/timerList/timer.slice";
import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import AddTimer from "./AddTimer/AddTimer";
import { TimerItem } from "./TimerItem/Timer.component";


function TimerListComponent() {
  const { ListTimer }: {
    ListTimer: TTimer[];
    selectedTimer: {};
} = useAppSelector((state) => state.TimerList) || [];
  useEffect(() => {
    console.log(ListTimer);
  }, [ListTimer]);

  return (
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">TimerList</div>
      <div className=" w-full grid grid-cols-3 gap-4 h-[75vh]">
        <AddTimer />
        <div className="col-span-2 flex justify-center w-full py-3 px-6 border-l h-full
         scroll-m-0 overflow-y-scroll">

        {ListTimer != null && ListTimer.length > 0 && (
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex justify-between w-full">
                <span>
                  {"Timers : " +  ListTimer?.length}
                </span>
                <span>
                  {"Active : " +  ListTimer?.filter((todo) => todo.isComplete == false).length}
                </span>

              </div>
            {ListTimer?.map((li: TTimer) => (
              <TimerItem
                key={li.id}
                item={li}
                            
              />
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default TimerListComponent;
