"use client"
import TimerSideBar from "./TimerFilter/TimerSideBar.componen";
import TimerList from "./TimerList/TimerList.component";


function TimerListComponent() {

  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">TimerList</div>

      <div className=" w-full grid grid-cols-3 h-[70vh]">

        <TimerSideBar />

        <TimerList />

      </div>
    </div>
  );
}

export default TimerListComponent;
