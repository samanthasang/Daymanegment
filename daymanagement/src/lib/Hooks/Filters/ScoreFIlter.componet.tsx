"use client";
import { useMemo, useState } from "react";

function ScoreFIlter(List: any[]) {
  const [scoreFilter, setScoreFilter] = useState(false);

  const scoreArray = useMemo(
    () => (scoreFilter ? [...List]?.filter((a) => a.score > 9) : List),

    [scoreFilter, List]
  );

  return { scoreArray, scoreFilter, setScoreFilter };
}

export default ScoreFIlter;
