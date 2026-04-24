"use client";
import { useMemo, useState } from "react";
import IncomeArray from "../ListInfo/IncomeArray.componen";

function IncomeFilter<T>(List: T[]) {
  const [incomeFilter, setIncomeFilter] = useState(false);

  const incomeArray: T[] = useMemo(
    () => (incomeFilter ? IncomeArray(List) : List),
    [incomeFilter, List]
  );

  return { incomeArray, incomeFilter, setIncomeFilter };
}

export default IncomeFilter;
