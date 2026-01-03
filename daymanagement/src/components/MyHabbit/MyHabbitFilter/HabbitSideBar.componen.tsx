"use client"
import UseMyHabbitList from "@/lib/Hooks/Lists/UseHabbitList.component copy";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import FilterComponent from "../../Filter/Todo.component";

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix(); 

function MyHabbitSideBar() {

  const ListMyHabbit = UseMyHabbitList()
   
  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="flex flex-col flex-1 gap-4 w-full h-full">
        <div className="h-full">
          <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>

            <FilterComponent witDate={false} />

          </div>
        </div>
        
        <div className="flex justify-between w-full mx-auto h-9">
          <span>
            {"MyHabbit : " + `${ListMyHabbit?.filter((todo) => dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD")
                                     ==  dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")).length} / ${ListMyHabbit?.length}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MyHabbitSideBar;
