"use client"
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import { HabbitItem } from "./HabbitItem/Habbit.component";


function MyHabbitListComponent() {
  const { ListHabbit }: {
    ListHabbit: Thabbit[];
    selectedhabbit: {};
} = useAppSelector((state) => state.habbitList) || [];
  useEffect(() => {
    console.log(ListHabbit);
  }, [ListHabbit]);

  return (
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">HabbitList</div>
        <div className="col-span-2 flex justify-center w-full py-3 px-6 border-l h-full
         scroll-m-0 overflow-y-scroll">

        {ListHabbit != null && ListHabbit.length > 0 && (
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex justify-between w-full">
                <span>
                  {"Habbit : " +  ListHabbit?.length}
                </span>
                <span>
                  {"Done Today : " +  ListHabbit?.filter((todo) => todo.score > 0).length}
                </span>

              </div>
            {ListHabbit?.map((li: Thabbit) => (
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
