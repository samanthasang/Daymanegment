"use client"
import useSpendsList from "@/lib/Hooks/Lists/UseSpendsList.component copy";
import { cn } from "@/lib/utils";
import { TSpends } from "@/modules/spends/spends.slice";
import SpendsItem from "../SpendsItem/SpendsItem.component";

function SpendsList() {

  const ListToDo = useSpendsList()
   
  return (
    <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto", 
                ListToDo && ListToDo.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
          {ListToDo?.length == 0 ? 
              <div className="flex items-center justify-center rounded-2xl h-full">
                <span>
                  There is nothing to show
                </span>
              </div>
            : ListToDo?.map((li: TSpends) => (
              <SpendsItem
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

export default SpendsList;
