"use client";
import { useMemo, useState } from "react";
import ComplateSortFIlter from "../ListInfo/ComplateSortFIlter.component";

function ComplateFIlter(List: any[]) {
  const [complateFIlter, setcomplateFIlter] = useState(true);

  const complateArray = useMemo(
    () => (complateFIlter ? ComplateSortFIlter(List) : List),
    [List, complateFIlter]
  );

  return { complateArray, complateFIlter, setcomplateFIlter };
}

export default ComplateFIlter;
