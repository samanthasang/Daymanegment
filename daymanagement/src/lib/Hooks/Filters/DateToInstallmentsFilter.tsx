"use client";
import { useMemo } from "react";
import { currentUnixTimestampZero } from "../UseDayJS";
import UseSearchParams from "../UseSearchParams";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";

function DateToInstallmentsFilter(List: any[]) {
  const { hasdateTo, dateTo } = UseSearchParams();

  const toDay = dateTo || currentUnixTimestampZero.toString();

  const dateToArray = useMemo(
    () =>
      hasdateTo && dateTo
        ? [...List]?.filter((list) =>
            list.installmentstList.filter(
              (ins: TInstallmentst) => !ins.isComplete
            )[0]
              ? list.installmentstList.filter(
                  (ins: TInstallmentst) => !ins.isComplete
                )[0].date
              : list.lastUpdate <= toDay
          )
        : List,
    [List, hasdateTo, dateTo]
  );

  return dateToArray;
}

export default DateToInstallmentsFilter;
