import { useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import React from "react";

function ListContainer({
  listTitle,
  selectedID,
  children,
}: {
  selectedID: boolean;
  listTitle?: string;
  children: React.ReactNode;
}) {
  const { OpenFilter } = useAppSelector((state) => state.Menu);
  return (
    <div
      className={cn(
        "relative w-full flex flex-col flex-1 h-[calc(100vh-24px)] p-1 mx-auto rounded-3xl bg-secondary",
        selectedID || OpenFilter
          ? selectedID && !OpenFilter
            ? "w-1/2"
            : !selectedID && OpenFilter
              ? "w-full"
              : "w-1/2"
          : "w-full"
      )}
    >
      {listTitle && (
        <div className="w-full text-center p-2 border-b-2 border-[#1C2936]">
          {listTitle}
        </div>
      )}
      {children}
    </div>
  );
}

export default ListContainer;
