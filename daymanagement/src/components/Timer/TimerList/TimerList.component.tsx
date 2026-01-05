"use client"
import useTimerList from "@/lib/Hooks/Lists/UseTimerList.component";
import { cn } from "@/lib/utils";
import { SelectedTimer } from "../TimerItem/SelectedTimer.component";
import { TTimer } from "@/modules/timerList/timer.slice";

function TimerList() {

  const ListTimer = useTimerList()
   
  return (
    <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto", 
                ListTimer && ListTimer.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
          {ListTimer?.length == 0 ? 
              <div className="flex items-center justify-center rounded-2xl h-full">
                <span>
                  There is nothing to show
                </span>
              </div>
            : ListTimer?.map((li: TTimer) => (
              <SelectedTimer
                key={li.id}
                item={li}
              />
            )
          )
        }
      </div>
    </div>
  );
}

export default TimerList;
