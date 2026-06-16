"use client";
import { useMemo, useState } from "react";
import FinishedArray from "../ListInfo/FinishedArray.componen";

function FinishedFilter(List: any[]) {
  const [finishFilter, setFinishFilter] = useState(false);

  const finishArray = useMemo(
    () => (finishFilter ? FinishedArray(List) : List),
    [List]
  );

  return { finishArray, finishFilter, setFinishFilter };
}

export default FinishedFilter;
