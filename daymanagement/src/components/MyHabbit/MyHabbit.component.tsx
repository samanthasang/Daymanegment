"use client"
import { TMyHaBBIT } from "@/modules/myHabbitList/myHabbit.slice";
import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import { HabbitItem } from "./HabbitItem/Habbit.component";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

const currentUnixTimestamp = dayjs().unix();

function MyHabbitListComponent() {
  const { ListMyHaBBIT }: {
    ListMyHaBBIT: TMyHaBBIT[];
    selectedMyHaBBIT: {};
} = useAppSelector((state) => state.MYhabbitList) || [];
  useEffect(() => {
    console.log(ListMyHaBBIT);
  }, [ListMyHaBBIT]);

  return (
    <div className="w-2/3 m-auto bg-secondary flex-1 h-full">
      <div className="w-full text-center border-b p-3">MYHabbitList</div>
      <div className={cn("col-span-2 flex justify-center w-full py-3 px-6 h-full ", 
          ListMyHaBBIT.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>

        {ListMyHaBBIT != null && (
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex justify-between w-full">
                <span>
                  {"MyHabbit : " +  ListMyHaBBIT?.length}
                </span>
                <span>
                  {"Done Today : " +  ListMyHaBBIT?.filter((todo) => todo.score > 0).length}
                </span>

              </div>
            {ListMyHaBBIT.length !== 0 ? ListMyHaBBIT?.map((li: TMyHaBBIT) => (
              <HabbitItem
                key={li.id}
                item={li}   
              /> 
            )) :
              <div className="flex items-center justify-center rounded-2xl h-full">
              <span>
                There is nothing to show
              </span>
            </div>}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyHabbitListComponent;
