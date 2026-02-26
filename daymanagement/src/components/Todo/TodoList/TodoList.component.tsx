"use client";
import useTodoList from "@/lib/Hooks/Lists/UseTodoList.component";
import { cn } from "@/lib/utils";
import { TToDo } from "@/modules/toDoList/todo.slice";
import TodoItem from "../TodoItem/TodoItem.component";

function TodoList() {
  const ListToDo = useTodoList();

  return (
    <div
      className={cn(
        "flex flex-col gap-y-4 col-span-2 h-auto w-11/12 mx-auto",
        ListToDo && ListToDo.length !== 0 ? "scroll-m-0 overflow-y-scroll" : ""
      )}
    >
      {ListToDo?.length == 0 ? (
        <div className="flex items-center justify-center rounded-2xl h-full">
          <span>There is nothing to show</span>
        </div>
      ) : (
        ListToDo?.map((li: TToDo) => <TodoItem key={li.id} item={li} />)
      )}
    </div>
  );
}

export default TodoList;
