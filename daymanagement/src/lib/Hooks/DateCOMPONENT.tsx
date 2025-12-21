"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import useFilters from "./useFilters";

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);



function UseDateRangeComponent() {
    const { applyFilter } = useFilters();

    const searchParams = useSearchParams()

    const dateFrom = searchParams.get("dateFrom")
    const hasdateFrom = searchParams.has("dateFrom")
    const dateTo = searchParams.get("dateTo")
    const hasdateTo = searchParams.has("dateTo")

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    })

    const fromToday = dateRange?.from && new Date(dateRange?.from).setHours(0, 0, 0, 0);
    const toToday = dateRange?.to && new Date(dateRange?.to).setHours(0, 0, 0, 0);
    const fromTodayNow =  new Date().setHours(0, 0, 0, 0);

    const fromDay = fromToday && Math.floor(new Date(fromToday).getTime()/1000.0).toString()
    const toDay = toToday && Math.floor(new Date(toToday).getTime() / 1000.0).toString()
    const toDaUnix = Math.floor(new Date(fromTodayNow).getTime() / 1000.0).toString()
    
    useEffect(() => {
        dateRange && console.log(toDay);

        dateRange && dateRange.to && toDay ? applyFilter("dateTo", toDay) :
            applyFilter("dateTo", toDaUnix)
      
    }, [dateRange?.to])
    
    useEffect(() => {
        dateRange && console.log(fromDay);
        
        dateRange && dateRange.from && fromDay ? applyFilter("dateFrom", fromDay) :
            applyFilter("dateFrom", toDaUnix)
      
    }, [dateRange?.from])
    


    return(
        <>
            <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={1}
            className="rounded-lg border shadow-sm"
            />
            <Button disabled={!dateRange?.from} onClick={() => setDateRange({
                from: new Date(),
                to: new Date(),
            })} >
                Reset
            </Button>
        </>
    )
}
export default UseDateRangeComponent;
