"use client"
import HabbitSideBar from "./HabbitFilter/HabbitSideBar.componen";
import HabbitList from "./HabbitList/HabbitList.component";

function HabbitListComponent() {

  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">HabbitList</div>

      <div className=" w-full grid grid-cols-3 h-[70vh]">
        
        <HabbitSideBar />
        
        <HabbitList />

      </div>
    </div>
  );
}

export default HabbitListComponent;