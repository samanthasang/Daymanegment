"use client";

import ShareList from "./shareList/ShareList.component";

function ShareListComponent() {
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">SharesList</div>

      <ShareList />
    </div>
  );
}

export default ShareListComponent;
