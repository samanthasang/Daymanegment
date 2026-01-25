"use client"
import SpendsSideBar from "./SpendsFilter/SpendsSideBar.componen";
import SpendsList from "./SpendsList/SpendsList.component";

function SpendsListComponent() {
   
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">SpendsList</div>

      <div className=" w-full grid grid-cols-3 h-5 flex-1">

        <SpendsSideBar />

        <SpendsList />

      </div>
    </div>
  );
}

export default SpendsListComponent;