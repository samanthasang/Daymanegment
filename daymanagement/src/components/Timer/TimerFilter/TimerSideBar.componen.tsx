"use client"
import useTimerList from "@/lib/Hooks/Lists/UseTimerList.component";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import FilterComponent from "../../Filter/Todo.component";
import { Button } from "../../ui/button";
import { useAppDispatch } from "@/lib/hook";
import { setTimerList } from "@/modules/timerList/timer.slice";
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);


const currentUnixTimestamp = dayjs().unix();

function TimerSideBar() {
  const dispatch = useAppDispatch();

  const ListTimer = useTimerList()
   
  const onSubmit = () => {
    console.log("onSubmit", dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("YYYY-MM-DD HH:MM"));
    
      dispatch(setTimerList({
        id: "",
        title: `timer${ListTimer ? ListTimer.length : 0}`,
        startDate: (new Date().getTime() / 1000.0).toString(),
        endDate: (new Date().getTime() / 1000.0).toString(),
        isComplete: false,
        category: "",
        tag: ""
      }))
  };
  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="flex flex-col flex-1 gap-4 w-full h-full">
        <div className="h-full">
          <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>

            <FilterComponent witDate />

            
            <div className="col-span-1 w-full">
                <Button onClick={() => onSubmit()} type="submit" className="rounded-full h-64 cursor-pointer w-64 mt-10 mx-auto text-white bg-background border border-white">submit</Button>
            </div>
          
          </div>
        </div>
        
        <div className="flex justify-between w-full mx-auto h-9">
          <span>
            {"Timer : " + `${ListTimer?.filter((todo) => todo.isComplete == true).length} / ${ListTimer?.length}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TimerSideBar;
