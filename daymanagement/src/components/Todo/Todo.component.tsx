"use client"
import SideBar from "../Filter/SideBar.componen";
import TodoList from "./TodoList.component";

function TodoListComponent() {
   
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">TodoList</div>
      <div className=" w-full grid grid-cols-3 h-[70vh]">

        <SideBar drawerType={'TodoList'} formType="add" />

        <TodoList />
        
      </div>
    </div>
  );
}

export default TodoListComponent;
