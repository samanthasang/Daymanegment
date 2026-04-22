"use client";
import { useMemo } from "react";
import { currentUnixTimestampZero } from "../UseDayJS";
import UseSearchParams from "../UseSearchParams";

function DateToInstallmentsFilter(List: any[]) {
  const { hasdateTo, dateTo } = UseSearchParams();

  const toDay =
    hasdateTo && dateTo ? dateTo : currentUnixTimestampZero.toString();

  const dateToArray = useMemo(
    () =>
      hasdateTo && dateTo
        ? List?.filter((list) => +list.nextDate <= +toDay)
        : List,
    [List, hasdateTo, dateTo]
  );

  return dateToArray;
}

export default DateToInstallmentsFilter;
