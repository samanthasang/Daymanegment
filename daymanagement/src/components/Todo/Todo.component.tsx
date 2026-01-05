"use client"
import TodoSideBar from "./TodoFilter/TodoSideBar.componen";
import TodoList from "./TodoList/TodoList.component";

function TimerListComponent() {
   
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">TodoList</div>

      <div className=" w-full grid grid-cols-3 h-[70vh]">

        <TodoSideBar />

        <TodoList />

      </div>
    </div>
  );
}

export default TimerListComponent;