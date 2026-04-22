"use client";
import { useMemo, useState } from "react";
import IncomeArray from "../ListInfo/IncomeArray.componen";

function IncomeFilter(List: any[]) {
  const [incomeFilter, setIncomeFilter] = useState(false);

  const incomeArray = useMemo(
    () => (incomeFilter ? IncomeArray(List) : List),
    [incomeFilter, List]
  );

  return { incomeArray, incomeFilter, setIncomeFilter };
}

export default IncomeFilter;
