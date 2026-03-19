"use client";
import { useMemo, useState } from "react";

function IncomeFilter(List: any[]) {
  const [incomeFIlter, setIncomeFilter] = useState(false);

  const incomeArray = useMemo(
    () => (incomeFIlter ? [...List]?.filter((a) => !a.income) : List),

    [incomeFIlter, List]
  );

  return { incomeArray, incomeFIlter, setIncomeFilter };
}

export default IncomeFilter;
