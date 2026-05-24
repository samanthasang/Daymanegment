"use client";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import useFilters from "./useFilters";
import UseSearchParams from "./UseSearchParams";
import { currentUnixTimestampZero } from "./UseDayJS";

function UseDateRangeComponent() {
  const { applyFilter } = useFilters();

  const { hasdateFrom, dateFrom, hasdateTo, dateTo } = UseSearchParams();

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  });

  const fromToday =
    dateRange?.from && new Date(dateRange?.from).setHours(0, 0, 0, 0);
  const toToday = dateRange?.to && new Date(dateRange?.to).setHours(0, 0, 0, 0);
  const fromTodayNow = new Date().setHours(0, 0, 0, 0);

  const fromDay =
    fromToday && Math.floor(new Date(fromToday).getTime() / 1000.0).toString();
  const toDay =
    toToday && Math.floor(new Date(toToday).getTime() / 1000.0).toString();
  const toDaUnix = Math.floor(
    new Date(fromTodayNow).getTime() / 1000.0
  ).toString();

  useEffect(() => {
    dateRange && dateRange.to && toDay
      ? applyFilter("dateTo", toDay)
      : applyFilter("dateTo", toDaUnix);
  }, [dateRange?.to]);

  useEffect(() => {
    dateRange && dateRange.from && fromDay
      ? applyFilter("dateFrom", fromDay)
      : applyFilter("dateFrom", toDaUnix);
  }, [dateRange?.from]);

  useEffect(() => {
    hasdateFrom
      ? hasdateTo
        ? dateTo &&
          dateFrom &&
          dateFrom !== fromDay &&
          dateTo !== toDay &&
          setDateRange({
            from: new Date(dayjs(dayjs.unix(Number(dateFrom))).toDate()),
            to: new Date(dayjs(dayjs.unix(Number(dateTo))).toDate()),
          })
        : setDateRange({
            from: new Date(dayjs(dayjs.unix(Number(dateFrom))).toDate()),
            to: new Date(),
          })
      : setDateRange({
          from: new Date(
            dayjs(dayjs.unix(Number(currentUnixTimestampZero))).toDate()
          ),
          to: new Date(dayjs(dayjs.unix(Number(dateTo))).toDate()),
        });
  }, [dateFrom, dateTo]);

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={1}
      captionLayout="dropdown"
      className="w-[320px] mx-auto rounded-2xl border shadow-sm bg-transparent"
    />
  );
}
export default UseDateRangeComponent;
