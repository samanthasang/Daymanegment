"use client";
import GoalsSideBar from "./GoalsFilter/GoalsSideBar.componen";
import GoalsList from "./GoalsList/GoalsList.component";

function GoalsListComponent() {
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">GoalsList</div>

      <div className=" w-full grid grid-cols-3 h-5 flex-1">
        <GoalsSideBar />

        <GoalsList />
      </div>
    </div>
  );
}

export default GoalsListComponent;
