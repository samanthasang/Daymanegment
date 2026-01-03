"use client"
import MyHabbitSideBar from "./MyHabbitFilter/HabbitSideBar.componen";
import MyHabbitList from "./MyHabbitList/HabbitList.component";


function MyHabbitListComponent() {

  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">MyHabbitList</div>

      <div className=" w-full grid grid-cols-3 h-[70vh]">
        
        <MyHabbitSideBar />
        
        <MyHabbitList />

      </div>
    </div>
  );
}

export default MyHabbitListComponent;
