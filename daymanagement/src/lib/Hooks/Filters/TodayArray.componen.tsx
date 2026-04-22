"use client";
import { useMemo } from "react";
import {
  currentUnixTimestampZero,
  TomorrowUnixTimestampZero,
} from "../UseDayJS";

function TodayArray(List: any[]) {
  const todayArray = useMemo(
    () =>
      List?.filter(
        (item) =>
          +item.date <= currentUnixTimestampZero &&
          +item.date > TomorrowUnixTimestampZero
      ),

    [List]
  );

  return todayArray;
}

export default TodayArray;
