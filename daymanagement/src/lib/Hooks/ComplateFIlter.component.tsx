"use client";
import { useMemo, useState } from "react";

function ComplateFIlter(List: any[]) {
  const [complateFIlter, setcomplateFIlter] = useState(true);

  const complateArray = useMemo(
    () =>
      complateFIlter
        ? [...List]?.sort((a, b) => +a.isComplete - +b.isComplete)
        : List,

    [complateFIlter, List]
  );

  return { complateArray, complateFIlter, setcomplateFIlter };
}

export default ComplateFIlter;
