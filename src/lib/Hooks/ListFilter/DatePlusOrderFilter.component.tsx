"use client";
import { useMemo } from "react";

function DatePlusOrderFilter(List: any[]) {
  const dateOrderArray = useMemo(
    () => List?.sort((a, b) => +a.doDate - +b.doDate) as any[],
    [List]
  );

  return dateOrderArray;
}

export default DatePlusOrderFilter;
