"use client"
import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import AddToDo from "./AddHabbit/AddHabbit";
import TodoItem, { HabbitItem } from "./HabbitItem/Habbit.component";
import { TToDo } from "@/modules/toDoList/todo.slice";
import AddHabbit from "./AddHabbit/AddHabbit";


function HabbitListComponent() {
  const { ListToDo }: {
    ListToDo: TToDo[];
    selectedToDo: {};
} = useAppSelector((state) => state.todoList) || [];
  useEffect(() => {
    console.log(ListToDo);
  }, [ListToDo]);

  return (
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">HabbitList</div>
      <div className=" w-full grid grid-cols-3 gap-4 h-[75vh]">
        <AddHabbit />
        <div className="col-span-2 flex justify-center w-full py-3 px-6 border-l h-full
         scroll-m-0 overflow-y-scroll">

        {ListToDo != null && ListToDo.length > 0 && (
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex justify-between w-full">
                <span>
                  {"Habbit : " +  ListToDo?.length}
                </span>
                <span>
                  {"Done Today : " +  ListToDo?.filter((todo) => todo.isComplete == true).length}
                </span>

              </div>
            {ListToDo?.map((li: TToDo) => (
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
