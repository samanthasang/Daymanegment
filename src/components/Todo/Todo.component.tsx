import { Suspense } from "react";
import FormTodo from "./FormTodo/FormTodo";
import TodoList from "./Todolist.component/TodoList.component";

function TodoListComponent() {

  return (
      <div className="flex flex-col gap-4 w-full h-[80vh] bg-slate-500 m-auto p-10">
        <h1 className="scroll-m-20 text-4xl text-slate-100 text-center w-full font-extrabold tracking-tight lg:text-5xl">TodoList</h1>
        <div className="flex flex-row gap-4 h-max">
        <FormTodo />
        <Suspense>
          <TodoList />
        </Suspense>
        </div>
      </div>
  );
}

export default TodoListComponent;
