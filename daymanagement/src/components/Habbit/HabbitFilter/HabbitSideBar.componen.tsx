"use client"
import UseHabbitList from "@/lib/Hooks/Lists/UseHabbitList.component";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import FilterComponent from "../../Filter/Todo.component";
import { Button } from "../../ui/button";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix(); 

function HabbitSideBar() {

  const ListHabbit = UseHabbitList()
   
  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="flex flex-col flex-1 gap-4 w-full h-full">
        <div className="h-full">
          <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>

            <FilterComponent witDate={false} />

            <div className="flex justify-between w-full mx-auto h-9">
              <DrawerDialogDemo drawerType={'HabbitList'} formType="Add Habbit" >
                <DialogTrigger asChild>
                  <Button variant="outline"><span>add</span></Button>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>

          </div>
        </div>
        
        <div className="flex justify-between w-full mx-auto h-9">
          <span>
            {"Habbit : " + `${ListHabbit?.filter((todo) => dayjs(dayjs.unix(Number(todo.completeUpdate))).format("DD")
                                     ==  dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD")).length} / ${ListHabbit?.length}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HabbitSideBar;
