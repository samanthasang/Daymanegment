"use client"
import UseHabbitList from "@/lib/Hooks/Lists/UseHabbitList.component";
import { cn } from "@/lib/utils";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import HabbitItem from "../HabbitItem/HabbitItem.componen";

function HabbitList() {

  const ListHabbit = UseHabbitList()
   
  return (
    <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto", 
                ListHabbit && ListHabbit.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
          {ListHabbit?.length == 0 ? 
              <div className="flex items-center justify-center rounded-2xl h-full">
                <span>
                  There is nothing to show
                </span>
              </div>
            : ListHabbit?.map((li: Thabbit) => (
              <HabbitItem
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

export default HabbitList;
