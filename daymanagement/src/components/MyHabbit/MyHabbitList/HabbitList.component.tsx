"use client"
import UseHabbitList from "@/lib/Hooks/Lists/UseHabbitList.component";
import { cn } from "@/lib/utils";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import UseMyHabbitList from "@/lib/Hooks/Lists/UseHabbitList.component copy";
import HabbitItem from "@/components/Habbit/HabbitItem/HabbitItem.componen";
import MyHabbitItem from "../MyHabbitItem/MyHabbitItem.componen";

function MyHabbitList() {

  const ListMyHabbit = UseMyHabbitList()
   
  return (
    <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto", 
                ListMyHabbit && ListMyHabbit.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
          {ListMyHabbit?.length == 0 ? 
              <div className="flex items-center justify-center rounded-2xl h-full">
                <span>
                  There is nothing to show
                </span>
              </div>
            : ListMyHabbit?.map((li: Thabbit) => (
              <MyHabbitItem
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

export default MyHabbitList;
