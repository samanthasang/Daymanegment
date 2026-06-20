import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import React from "react";

function ListContainer({
  selectedID,
  children,
}: {
  selectedID: boolean;
  children: React.ReactNode;
}) {
  const { isSX, isSMMin } = useMediaQueryValues();
  return (
    ((isSX && !selectedID) || isSMMin) && (
      <div
        className={cn(
          "flex flex-col flex-1 h-[calc(100vh-16px)] p-0.5 gap-y-2 rounded-3xl",
          (isSX && !selectedID) || isSMMin ? "w-full" : "w-1/2"
        )}
      >
        {children}
      </div>
    )
  );
}

export default ListContainer;
