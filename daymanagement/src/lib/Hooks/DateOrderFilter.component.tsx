"use client";
import { useMemo, useState } from "react";

function DateOrderFilter(List: any[]) {
  const [dateOrderFilter, setDateOrderFilter] = useState(true);

  const dateOrderArray = useMemo(
    () =>
      dateOrderFilter
        ? ([...List]?.sort((a, b) => +a.date - +b.date) as any)
        : List,
    [dateOrderFilter, List]
  );

  return { dateOrderArray, dateOrderFilter, setDateOrderFilter };
}

export default DateOrderFilter;
