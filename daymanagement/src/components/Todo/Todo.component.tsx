"use client"
import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import AddToDo from "./AddTodo/AddToDo";
import TodoItem from "./TodoItem/Todo.component";
import { TToDo } from "@/modules/toDoList/todo.slice";

// export type ToDo = { id: string; title: string; isComplete: boolean }

function TodoListComponent() {
  const { ListToDo }: {
    ListToDo: never[];
    selectedToDo: {};
} = useAppSelector((state) => state.todoList) || [];
  useEffect(() => {
    console.log(ListToDo);
  }, [ListToDo]);

  return (
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">TodoList</div>
      <div className=" w-full grid grid-cols-3 gap-4 h-[75vh]">
        <AddToDo />
        <div className="col-span-2 flex justify-center w-full py-3 px-6 border-l h-full
         scroll-m-0 overflow-y-scroll">

        {ListToDo != null && ListToDo.length > 0 && (
          <div className="flex flex-col gap-4 w-full ">
            {ListToDo?.map((li: TToDo) => (
              <TodoItem
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

export default TodoListComponent;
