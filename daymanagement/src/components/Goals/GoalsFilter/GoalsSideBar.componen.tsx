"use client";
import useTodoList from "@/lib/Hooks/Lists/UseTodoList.component";
import { cn } from "@/lib/utils";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { DrawerDialogDemo } from "../../Drawer/DrawerComponent";
import { Button } from "../../ui/button";
import FilterComponent from "../../Filter/FilterComponent";
import useGoalsList from "@/lib/Hooks/Lists/UseGoalsList.component";

function GoalsSideBar() {
  const ListGoals = useGoalsList();

  return (
    <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">
      <div className="flex flex-col flex-1 gap-4 w-full h-full">
        <div className="h-full">
          <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>
            <FilterComponent witDate />

            <div className="flex justify-between w-full mx-auto h-9">
              <DrawerDialogDemo drawerType={"GoalsList"} formType="Add Goals">
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <span>add</span>
                  </Button>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>
          </div>
        </div>

        <div className="flex justify-between w-full mx-auto h-9">
          <span>
            {"Goalss : " +
              `${ListGoals?.filter((todo) => todo.isComplete == true).length} / ${ListGoals?.length}`}
          </span>
        </div>
      </div>
    </div>
  );
}

export default GoalsSideBar;
