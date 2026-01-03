"use client"
import useTodoList from "@/lib/Hooks/Lists/UseTodoList.component";
import { cn } from "@/lib/utils";
import { TToDo } from "@/modules/toDoList/todo.slice";
import SelectedTodo from "./TodoItem/SelectedTodo.component";

function TodoList() {

  const ListToDo = useTodoList()
   
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
            : ListToDo?.map((li: TToDo) => (
              <SelectedTodo
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

export default TodoList;
