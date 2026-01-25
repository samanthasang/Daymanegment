"use client"
import TodoSideBar from "./TodoFilter/TodoSideBar.componen";
import TodoList from "./TodoList/TodoList.component";

function TodoListComponent() {
   
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">TodoList</div>

      <div className=" w-full grid grid-cols-3 h-5 flex-1">

        <TodoSideBar />

        <TodoList />

      </div>
    </div>
  );
}

export default TodoListComponent;