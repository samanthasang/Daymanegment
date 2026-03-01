import { cn } from "@/lib/utils";
import React from "react";

function ListContainer({
  scrollOn,
  listTitle,
  ListInfo,
  children,
}: {
  scrollOn: boolean;
  listTitle: string;
  ListInfo: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] sm:h-[calc(100vh-10rem)] gap-y-4 col-span-2 w-11/12 mx-auto">
      <div
        className={cn(
          "flex flex-col h-full gap-y-2",
          scrollOn ? "scroll-m-0 overflow-y-scroll" : ""
        )}
      >
        {children}
      </div>
      <div className="flex justify-between w-full mx-auto h-9">
        <span>{listTitle}</span>
        <span>{ListInfo}</span>
      </div>
    </div>
  );
}

export default ListContainer;
