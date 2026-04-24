"use client";
import { useMemo, useState } from "react";
import OutcomeArray from "../ListInfo/outcomeArray.componet";

function IncomeMFilter<T>(List: T[]) {
  const [incomeMFIlter, setIncomeMFilter] = useState(false);

  const incomeMArray: T[] = useMemo(
    () => (incomeMFIlter ? OutcomeArray(List) : List),

    [incomeMFIlter, List]
  );

  return { incomeMArray, incomeMFIlter, setIncomeMFilter };
}

export default IncomeMFilter;
