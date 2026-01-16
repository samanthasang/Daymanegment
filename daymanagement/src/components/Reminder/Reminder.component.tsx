"use client"
import { TToDo } from "@/modules/toDoList/todo.slice";
import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import AddReminder from "./AddReminder/AddReminder";
import { ReminderItem } from "./ReminderItem/Reminder.component";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";


function ReminderListComponent() {
  const { ListToDo }: {
    ListToDo: TToDo[];
    selectedToDo: {};
} = useAppSelector((state) => state.todoList) || [];
  useEffect(() => {
    console.log(ListToDo);
  }, [ListToDo]);

  return (
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">ReminderList</div>
      <DrawerDialogDemo drawerType={'ReminderList'} formType="Add Reminder" />
      <div className=" w-full grid grid-cols-3 gap-4 h-[75vh]">
        <AddReminder />
        <div className="col-span-2 flex justify-center w-full py-3 px-6 border-l h-full
         scroll-m-0 overflow-y-scroll">

        {ListToDo != null && ListToDo.length > 0 && (
            <div className="flex flex-col gap-4 w-full ">
              <div className="flex justify-between w-full">
                <span>
                  {"Reminder : " +  ListToDo?.length}
                </span>
                <span>
                  {"Completed : " +  ListToDo?.filter((todo) => todo.isComplete == true).length}
                </span>

              </div>
            {ListToDo?.map((li: TToDo) => (
              <ReminderItem
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

export default ReminderListComponent;
