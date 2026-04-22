import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
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
      <div className="flex flex-col flex-1 h-[calc(100vh-18px)] p-1.5 mx-auto rounded-3xl bg-secondary">
        {children}
      </div>
    )
  );
}

export default ListContainer;
