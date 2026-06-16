"use client";
import { useMemo } from "react";

function DoDateSortPlusFilter(List: any[]) {
  const doDateSortArray = useMemo(
    () => List?.sort((a, b) => +a.doDate - +b.doDate) as any[],
    [List]
  );

  return doDateSortArray;
}

export default DoDateSortPlusFilter;
