"use client"
import useReminderList from "@/lib/Hooks/Lists/UseReminderList.component";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import FilterComponent from "../../Filter/Todo.component";
import { Button } from "../../ui/button";

function ReminderSideBar() {
  const ListReminder = useReminderList();
   
  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="flex flex-col flex-1 gap-4 w-full h-full">
        <div className="h-full">
          <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>

            <FilterComponent witDate />

            <div className="flex justify-between w-full mx-auto h-9">
              <DrawerDialogDemo drawerType={'ReminderList'} formType="Add Reminder" >
                <DialogTrigger asChild>
                  <Button variant="outline"><span>add</span></Button>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>

          </div>
        </div>
        
        <div className="flex justify-between w-full mx-auto h-9">
          <span>
            {"Todos : " + `${ListReminder?.filter((reminder ) => reminder  .isComplete == true).length} / ${ListReminder?.length}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ReminderSideBar;
