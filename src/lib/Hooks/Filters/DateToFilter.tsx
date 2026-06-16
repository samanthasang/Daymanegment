"use client";
import { useMemo } from "react";
import DateToArray from "../ListInfo/DateToArray";
import { currentUnixTimestampZero } from "../UseDayJS";
import UseSearchParams from "../UseSearchParams";

function DateToFilter(List: any[]) {
  const { hasdateTo, dateTo } = UseSearchParams();

  const toDay =
    hasdateTo && dateTo ? dateTo : currentUnixTimestampZero.toString();

  const dateToArray = useMemo(
    () => (hasdateTo && !!dateTo ? DateToArray(List, +toDay) : List),
    [List, hasdateTo, dateTo]
  );

  return dateToArray;
}

export default DateToFilter;
