"use client";
import { useMemo } from "react";

function StartDateOrderPlusFilter(List: any[]) {
  const startDateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.startDate - +b.startDate) as any[],

    [List]
  );

  return startDateOrderArray;
}

export default StartDateOrderPlusFilter;
