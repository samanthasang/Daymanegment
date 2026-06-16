"use client";
import { useMemo } from "react";

function StartDateOrderMinusFilter(List: any[]) {
  const startDateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.startDate + +b.startDate).reverse() as any[],

    [List]
  );

  return startDateOrderArray;
}

export default StartDateOrderMinusFilter;
