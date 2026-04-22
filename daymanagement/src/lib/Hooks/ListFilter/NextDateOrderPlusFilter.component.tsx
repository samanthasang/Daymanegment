"use client";
import { useMemo } from "react";

function NextDateOrderPlusFilter(List: any[]) {
  const startDateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.nextDate - +b.nextDate) as any[],
    [List]
  );

  return startDateOrderArray;
}

export default NextDateOrderPlusFilter;
