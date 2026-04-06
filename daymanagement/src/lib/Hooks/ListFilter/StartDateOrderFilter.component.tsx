"use client";
import { useMemo, useState } from "react";

function StartDateOrderFilter(List: any[]) {
  const [startDateOrderFilter, setStartDateOrderFilter] = useState(true);

  const startDateOrderArray = useMemo(
    () =>
      startDateOrderFilter
        ? ([...List]?.sort((a, b) => +a.startDate - +b.startDate) as any)
        : List,
    [startDateOrderFilter, List]
  );

  return { startDateOrderArray, startDateOrderFilter, setStartDateOrderFilter };
}

export default StartDateOrderFilter;
