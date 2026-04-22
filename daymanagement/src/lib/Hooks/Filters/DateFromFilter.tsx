"use client";
import { useMemo } from "react";
import { currentUnixTimestampZero } from "../UseDayJS";
import UseSearchParams from "../UseSearchParams";
import DateFromArray from "../ListInfo/DateFromArray";

function DateFromFilter(List: any[]) {
  const { hasdateFrom, dateFrom } = UseSearchParams();

  const fromDay =
    hasdateFrom && dateFrom ? +dateFrom : currentUnixTimestampZero;

  const dateFromArray = useMemo(
    () => DateFromArray(List, fromDay),
    [List, hasdateFrom, dateFrom]
  );

  return dateFromArray;
}

export default DateFromFilter;
