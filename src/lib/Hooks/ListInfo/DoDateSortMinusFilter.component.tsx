"use client";
import { useMemo } from "react";

function DoDateSortMinusFilter(List: any[]) {
  const startDateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.doDate + +b.doDate).reverse() as any[],
    [List]
  );

  return startDateOrderArray;
}

export default DoDateSortMinusFilter;
