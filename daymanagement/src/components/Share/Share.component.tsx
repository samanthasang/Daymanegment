"use client";
import ShareSideBar from "./ShareFilter/ShareSideBar.componen";
import ShareList from "./ShareList/ShareList.component";

function ShareListComponent() {
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">ShareList</div>

      <div className=" w-full grid grid-cols-3 h-5 flex-1">
        <ShareSideBar />

        <ShareList />
      </div>
    </div>
  );
}

export default ShareListComponent;
