"use client"
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import AddHabbit from "./AddHabbit/AddHabbit";
import { HabbitItem } from "./HabbitItem/Habbit.component";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";


function HabbitListComponent() {
  const { ListHabbit, selectedhabbit }: {
    ListHabbit: Thabbit[];
    selectedhabbit: Thabbit | {};
} = useAppSelector((state) => state.habbitList) || [];
  useEffect(() => {
    console.log(ListHabbit);
  }, [ListHabbit]);

  useEffect(() => {
    console.log(selectedhabbit);
  }, [selectedhabbit]);

  return (
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">HabbitList</div>
      <DrawerDialogDemo drawerType={'ReminderList'} formType="add" />
      <div className=" w-full grid grid-cols-3 gap-4 h-[75vh]">
        <AddHabbit />
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
    </div>
  );
}

export default HabbitListComponent;
