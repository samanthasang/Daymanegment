"use client";
import { useMemo, useState } from "react";

function IncomeMFilter(List: any[]) {
  const [incomeMFIlter, setIncomeMFilter] = useState(false);

  const incomeMArray = useMemo(
    () => (incomeMFIlter ? [...List]?.filter((a) => a.income) : List),

    [incomeMFIlter, List]
  );

  return { incomeMArray, incomeMFIlter, setIncomeMFilter };
}

export default IncomeMFilter;
