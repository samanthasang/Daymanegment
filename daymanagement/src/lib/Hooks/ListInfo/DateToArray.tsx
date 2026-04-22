"use client";
import { useMemo } from "react";

function DateToArray(List: any[], date: number) {
  return useMemo(
    () => List?.filter((list) => +list.doDate <= +date),
    [List, date]
  );
}

export default DateToArray;
