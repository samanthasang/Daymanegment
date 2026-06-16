"use client";
import { useMemo } from "react";

function LastDateOrderMinusFilter(List: any[]) {
  const startDateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.lastUpdate + +b.lastUpdate).reverse() as any[],

    [List]
  );

  return startDateOrderArray;
}

export default LastDateOrderMinusFilter;
