"use client";
import { useMemo } from "react";
import { currentUnixTimestampZero } from "../UseDayJS";
import UseSearchParams from "../UseSearchParams";

function DateToFilter(List: any[]) {
  const { hasdateTo, dateTo } = UseSearchParams();

  const toDay =
    hasdateTo && dateTo ? dateTo : currentUnixTimestampZero.toString();

  const dateToArray = useMemo(
    () => (!!dateTo ? [...List]?.filter((list) => +list.date <= +toDay) : List),
    [List, hasdateTo, dateTo]
  );

  return dateToArray;
}

export default DateToFilter;
