"use client"
import { useEffect, useState } from "react";
import { useAppSelector } from "../../lib/hook";
import AddToDo from "./AddTodo/AddToDo";
import TodoItem from "./TodoItem/Todo.component";
import { TToDo } from "@/modules/toDoList/todo.slice";
import SelectedTodo from "./TodoItem/SelectedTodo.component";
import { cn } from "@/lib/utils";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";
import { DateRange } from "react-day-picker";
import { Calendar } from "../ui/calendar";


function TodoListComponent() {
  const { ListToDo }: {
    ListToDo: TToDo[];
    selectedToDo: {};
} = useAppSelector((state) => state.todoList) || [];
  useEffect(() => {
    console.log(ListToDo);
  }, [ListToDo]);

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 5, 12),
    to: new Date(2025, 6, 15),
  })
  return (
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">TodoList</div>
      <div className=" w-full grid grid-cols-3 h-[70vh]">
        {/* <AddToDo /> */}

        <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">

        {ListToDo != null && ListToDo.length > 0 && (
            <div className="flex flex-col flex-1 gap-4 w-full h-full">
              
              <div className="h-full">
                <div className={cn("flex flex-col justify-start gap-y-3 w-full", 
                    ListToDo.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
              {/* {ListToDo?.map((li: TToDo) => (
                <SelectedTodo
                  key={li.id}
                  item={li}
                />
              ))} */}
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={1}
                    className="rounded-lg border shadow-sm"
                  />
          <div className="flex justify-between w-full mx-auto h-9">
            <DrawerDialogDemo drawerType={'TodoList'} formType="add" />
          </div>
              </div>
              </div>
              <div className="flex justify-between w-full mx-auto h-9">
                <span>
                  {"Todos : " + `${ListToDo?.filter((todo) => todo.isComplete == true).length} / ${ListToDo?.length}`}
                </span>

              </div>
            </div>
        )}
        </div>
        <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto", 
                    ListToDo.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
          {/* <div className="w-full">AddToDo</div> */}
               
          {ListToDo?.map((li: TToDo) => (
                <SelectedTodo
                  key={li.id}
                  item={li}
                />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoListComponent;
