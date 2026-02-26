"use client";
import HomeList from "./HomeList/HomeList.component";
import TodoSideBar from "./TodoFilter/TodoSideBar.componen";

function HomeComponent() {
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">Home</div>

      <div className=" w-full grid grid-cols-3 h-5 flex-1">
        <TodoSideBar />

        <HomeList />
      </div>
    </div>
  );
}

export default HomeComponent;
