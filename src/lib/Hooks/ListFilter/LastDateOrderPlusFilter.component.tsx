"use client";
import { useMemo } from "react";

function LastDateOrderPlusFilter(List: any[]) {
  const startDateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.lastUpdate - +b.lastUpdate) as any[],

    [List]
  );

  return startDateOrderArray;
}

export default LastDateOrderPlusFilter;
