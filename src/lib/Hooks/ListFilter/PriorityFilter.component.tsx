"use client";
import { useMemo, useState } from "react";
import PrioritySortArray from "../ListInfo/PrioritySortArray.component";

function PriorityFilter(List: any[]) {
  const [priorityFilter, setPriorityFilter] = useState(true);

  const priorityArray = useMemo(
    () => (priorityFilter ? PrioritySortArray(List) : List),
    [List]
  );

  return { priorityArray, priorityFilter, setPriorityFilter };
}

export default PriorityFilter;
