"use client"

import VisitsSideBar from "./VisitsFilter/VisitsSideBar.componen";
import VisitsList from "./VisitsList/VisitssList.component";

function VisitListComponent() {
   
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">Visits List</div>

      <div className=" w-full grid grid-cols-3 h-5 flex-1">
        <VisitsSideBar />

        <VisitsList />
      </div>
    </div>
  );
}

export default VisitListComponent;