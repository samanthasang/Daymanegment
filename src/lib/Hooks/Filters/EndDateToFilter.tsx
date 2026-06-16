"use client";
import { useMemo } from "react";
import { currentUnixTimestampZero } from "../UseDayJS";
import UseSearchParams from "../UseSearchParams";

function EndDateToFilter(List: any[]) {
  const { hasdateFrom, dateFrom } = UseSearchParams();

  const fromDay =
    hasdateFrom && dateFrom ? dateFrom : currentUnixTimestampZero.toString();

  const dateFromArray = useMemo(
    () => [...List]?.filter((list) => +list.endDate >= +fromDay),
    [List, hasdateFrom, dateFrom]
  );

  return dateFromArray;
}

export default EndDateToFilter;
