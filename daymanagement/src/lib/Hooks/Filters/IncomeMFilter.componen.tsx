"use client";
import { useMemo, useState } from "react";
import OutcomeArray from "../ListInfo/outcomeArray.componet";

function IncomeMFilter(List: any[]) {
  const [incomeMFIlter, setIncomeMFilter] = useState(false);

  const incomeMArray = useMemo(
    () => (incomeMFIlter ? OutcomeArray(List) : List),

    [incomeMFIlter, List]
  );

  return { incomeMArray, incomeMFIlter, setIncomeMFilter };
}

export default IncomeMFilter;
