"use client"
import { useAppSelector } from "@/lib/hook";
import { TReminder } from "@/modules/reminderList/reminder.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);

function useReminderList() {

  const { ListReminder }: {
      ListReminder: TReminder[];
      selectedReminder: {};
    } = useAppSelector((state) => state.reminder) || [];
  
  const searchParams = useSearchParams()

  const dateFrom = searchParams.get("dateFrom")
  const hasdateFrom = searchParams.has("dateFrom")
  const dateTo = searchParams.get("dateTo")
  const hasdateTo = searchParams.has("dateTo")
  const categorySearch = searchParams.get("category")
  const hasCategorySearch = searchParams.has("category")
  const tagSearch = searchParams.get("tag")
  const hasTagSearch = searchParams.has("tag")
  const fromTodayNow = new Date().setHours(0, 0, 0, 0);
 

  const [listAfterFilter, setListAfterFilter] = useState< TReminder[] | undefined>(ListReminder)

  useEffect(() => {
  const filterdList = () => {
      const fromDay = hasdateFrom ? dateFrom : Math.floor(new Date(fromTodayNow).getTime() / 1000.0).toString()
      const toDay = hasdateTo ? dateTo : Math.floor(new Date(fromTodayNow).getTime() / 1000.0).toString()
    let filterArrayDay= ListReminder || []
    if (fromDay && toDay && fromDay == toDay) {
          filterArrayDay =  ListReminder.filter((list) => list.date >= fromDay)
    }
    if (fromDay && toDay && fromDay != toDay) {
      filterArrayDay = ListReminder.filter((list) => Math.floor(+list.date).toString() >= fromDay &&
          Math.floor(+list.date).toString() <= toDay)
    }
    
    let filterArrayCat= filterArrayDay
    if (hasCategorySearch ) {
      filterArrayCat =  filterArrayDay.length > 0 ? filterArrayDay.filter((list) => list.category == categorySearch ) : []
    }

    let filterArrayTag= filterArrayCat
    if (hasTagSearch ) {
      filterArrayTag =  filterArrayCat.length > 0 ? filterArrayCat.filter((list) => list.tag == tagSearch ) : []
    }
    console.log(ListReminder);
    console.log(filterArrayDay);
    console.log(filterArrayCat);
    console.log(filterArrayTag);
  
    return filterArrayTag
    } 
  const list = filterdList() 

    list ? setListAfterFilter(list) : setListAfterFilter([])
    console.log(list)
  }, [ListReminder, dateFrom, dateTo, tagSearch, categorySearch])
  
   
  return listAfterFilter
}

export default useReminderList;
