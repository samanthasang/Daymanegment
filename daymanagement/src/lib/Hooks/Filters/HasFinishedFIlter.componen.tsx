"use client";
import { useMemo, useState } from "react";

function HasFinishedFIlter(List: any[]) {
  const [finishFIlter, setFinishFIlter] = useState(true);

  const finishArray = useMemo(
    () => (finishFIlter ? [...List]?.filter((a) => a.isComplete) : List),

    [finishFIlter, List]
  );

  return { finishArray, finishFIlter, setFinishFIlter };
}

export default HasFinishedFIlter;
