"use client"
import useGoalsList from "@/lib/Hooks/Lists/UseGoalsList.component copy";
import { cn } from "@/lib/utils";
import { TToDo } from "@/modules/toDoList/todo.slice";
import GoalsItem from "../GoalsItem/GoalsItem.component";

function GoalsList() {

  const ListGoals = useGoalsList()
   
  return (
    <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto", 
                ListGoals && ListGoals.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
          {ListGoals?.length == 0 ? 
              <div className="flex items-center justify-center rounded-2xl h-full">
                <span>
                  There is nothing to show
                </span>
              </div>
            : ListGoals?.map((li: TToDo) => (
              <GoalsItem
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

export default GoalsList;
