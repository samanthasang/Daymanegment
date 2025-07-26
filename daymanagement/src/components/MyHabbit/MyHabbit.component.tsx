"use client"
import { TMyHaBBIT } from "@/modules/myHabbitList/myHabbit.slice";
import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import { HabbitItem } from "./HabbitItem/Habbit.component";
import dayjs from "dayjs";

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
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">MYHabbitList</div>
        <div className="col-span-2 flex justify-center w-full py-3 px-6 border-l h-full
         scroll-m-0 overflow-y-scroll">

        {ListMyHaBBIT != null && ListMyHaBBIT.length > 0 && (
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex justify-between w-full">
                <span>
                  {"MyHabbit : " +  ListMyHaBBIT?.length}
                </span>
                <span>
                  {"Done Today : " +  ListMyHaBBIT?.filter((todo) => todo.score > 0).length}
                </span>

              </div>
            {ListMyHaBBIT?.map((li: TMyHaBBIT) => (
              <HabbitItem
                key={li.id}
                item={li}   
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyHabbitListComponent;
