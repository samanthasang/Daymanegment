"use client";
import { useMemo, useState } from "react";

function PriorityFilter(List: any[]) {
  const [priorityFilter, setPriorityFilter] = useState(true);

  console.log("PriorityFilter ", List);
  const priorityArray = useMemo(
    () =>
      priorityFilter
        ? [...List]?.sort((a, b) => {
            const aOrder =
              a.priority == "High" ? 3 : a.priority == "Low" ? 1 : 2;
            const bOrder =
              b.priority == "High" ? 3 : b.priority == "Low" ? 1 : 2;
            return bOrder - aOrder;
          })
        : List,
    [priorityFilter, List]
  );

  return { priorityArray, priorityFilter, setPriorityFilter };
}

export default PriorityFilter;
