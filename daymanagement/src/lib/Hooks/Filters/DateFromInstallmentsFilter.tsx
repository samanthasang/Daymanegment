"use client";
import { useMemo } from "react";
import { currentUnixTimestampZero } from "../UseDayJS";
import UseSearchParams from "../UseSearchParams";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";

function DateFromInstallmentsFilter(List: any[]) {
  const { hasdateFrom, dateFrom } = UseSearchParams();

  const fromDay = dateFrom || currentUnixTimestampZero.toString();

  const dateFromArray = useMemo(
    () =>
      [...List]?.filter((list) =>
        list.installmentstList.filter(
          (ins: TInstallmentst) => !ins.isComplete
        )[0]
          ? list.installmentstList.filter(
              (ins: TInstallmentst) => !ins.isComplete
            )[0].date
          : list.lastUpdate >= fromDay
      ),
    [List, hasdateFrom, dateFrom]
  );

  return dateFromArray;
}

export default DateFromInstallmentsFilter;
