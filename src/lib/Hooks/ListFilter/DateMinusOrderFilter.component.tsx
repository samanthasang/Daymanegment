"use client";
import { useMemo } from "react";

function DateMinusOrderFilter(List: any[]) {
  const dateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.doDate + +b.doDate).reverse() as any[],
    [List]
  );

  return dateOrderArray;
}

export default DateMinusOrderFilter;
