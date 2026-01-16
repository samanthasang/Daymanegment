"use client"
import useTodoList from "@/lib/Hooks/Lists/UseTodoList.component";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import { Button } from "../../ui/button";
import FilterComponent from "../../Filter/Todo.component";
import useTimerList from "@/lib/Hooks/Lists/UseTimerList.component";

function TimerSideBar() {

  const ListTimer = useTimerList()
   
  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="flex flex-col flex-1 gap-4 w-full h-full">
        <div className="h-full">
          <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>

            <FilterComponent witDate />

            <div className="flex justify-between w-full mx-auto h-9">
              <DrawerDialogDemo drawerType={'TimerList'} formType="Add Timer" >
                <DialogTrigger asChild>
                  <Button variant="outline"><span>add</span></Button>
                </DialogTrigger>
              </DrawerDialogDemo>
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
