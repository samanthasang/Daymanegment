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

function UseResetFilterComponent() {
    const { applyFilter } = useFilters();

    const searchParams = useSearchParams()

    const hasdateFrom = searchParams.has("dateFrom")
    const hasCategorySearch = searchParams.has("category")
    const hasTagSearch = searchParams.has("tag")

    const handleResetFilter = () => {
        applyFilter("dateFrom", false)
        applyFilter("dateTo", false)
        applyFilter("category", false)
        applyFilter("tag", false)
    }


    return(
        <Button disabled={!hasdateFrom || !hasCategorySearch || !hasTagSearch} onClick={() => handleResetFilter()} >
            Reset
        </Button>
    )
}
export default UseResetFilterComponent;
