import { useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import React from "react";

function ListContainer({
  listTitle,
  selectedID,
  children,
}: {
  selectedID: boolean;
  listTitle: string;
  children: React.ReactNode;
}) {
  const { OpenFilter } = useAppSelector((state) => state.Menu);
  return (
    <div
      className={cn(
        "relative flex flex-col h-[calc(100vh-24px)] col-span-7 p-1 mx-auto rounded-2xl bg-secondary",
        selectedID || OpenFilter
          ? selectedID && !OpenFilter
            ? "w-2/5"
            : !selectedID && OpenFilter
              ? "w-full"
              : "w-2/5"
          : "w-full"
      )}
    >
      <div className="w-full text-center p-2 border-b-2 border-[#1C2936]">
        {listTitle}
      </div>
      {children}
    </div>
  );
}

export default ListContainer;
