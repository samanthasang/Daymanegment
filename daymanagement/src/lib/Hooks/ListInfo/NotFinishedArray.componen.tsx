"use client";
import { useMemo } from "react";

function NotFinishedArray(List: any[]) {
  return useMemo(() => List?.filter((a) => a.isComplete), [List]);
}

export default NotFinishedArray;
