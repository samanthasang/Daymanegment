"use client"

import InstallmentsSideBar from "./InstallmentsFilter/InstallmentsFilterSideBar.componen";
import InstallmentsList from "./InstallmentsList/InstallmentsList.component";

function TodoListComponent() {
   
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">InstallmentsList</div>

      <div className=" w-full grid grid-cols-3 h-5 flex-1">

        <InstallmentsSideBar />

        <InstallmentsList />

      </div>
    </div>
  );
}

export default TodoListComponent;