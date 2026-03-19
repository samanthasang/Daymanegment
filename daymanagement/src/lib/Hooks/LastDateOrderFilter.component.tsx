"use client";
import { useMemo, useState } from "react";

function LastDateOrderFilter(List: any[]) {
  const [lastDateFilter, setLastDateOrderFilter] = useState(true);

  const LastDateOrderArray = useMemo(
    () =>
      lastDateFilter
        ? ([...List]?.sort((a, b) => +a.lastDate - +b.lastDate) as any)
        : List,
    [lastDateFilter, List]
  );

  return { LastDateOrderArray, lastDateFilter, setLastDateOrderFilter };
}

export default LastDateOrderFilter;
