"use client";
import { useMemo, useState } from "react";

function IncomeFilter(List: any[]) {
  const [incomeFilter, setIncomeFilter] = useState(false);

  const incomeArray = useMemo(
    () => (incomeFilter ? [...List]?.filter((a) => !a.income) : List),

    [incomeFilter, List]
  );

  return { incomeArray, incomeFilter, setIncomeFilter };
}

export default IncomeFilter;
