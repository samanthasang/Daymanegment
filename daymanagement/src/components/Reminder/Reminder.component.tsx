"use client"
import ReminderSideBar from "./ReminderFilter/ReminderSideBar.componen";
import ReminderList from "./ReminderList/ReminderList.component";


function ReminderListComponent() {
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">ReminderList</div>

      <div className=" w-full grid grid-cols-3 h-5 flex-1">

        <ReminderSideBar />

        <ReminderList />

      </div>
    </div>
  );
}

export default ReminderListComponent;
