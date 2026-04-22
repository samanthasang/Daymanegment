"use client";
import { useMemo } from "react";

function NextDateOrderMinusFilter(List: any[]) {
  const startDateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.nextDate + +b.nextDate).reverse() as any[],
    [List]
  );

  return startDateOrderArray;
}

export default NextDateOrderMinusFilter;
