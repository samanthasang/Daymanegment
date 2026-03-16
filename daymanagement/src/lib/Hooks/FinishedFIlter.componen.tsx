"use client";
import { useMemo, useState } from "react";

function FinishedFIlter(List: any[]) {
  const [finishFIlter, setFinishFIlter] = useState(true);

  const finishArray = useMemo(
    () => (finishFIlter ? [...List]?.filter((a) => !a.isComplete) : List),

    [finishFIlter, List]
  );

  return { finishArray, finishFIlter, setFinishFIlter };
}

export default FinishedFIlter;
