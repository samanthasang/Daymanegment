"use client";
import { useMemo, useState } from "react";

function FinishedFilter(List: any[]) {
  const [finishFilter, setFinishFilter] = useState(false);

  const finishArray = useMemo(
    () => (finishFilter ? [...List]?.filter((a) => !a.isComplete) : List),

    [finishFilter, List]
  );

  return { finishArray, finishFilter, setFinishFilter };
}

export default FinishedFilter;
