"use client"
import { TToDo } from "@/modules/toDoList/todo.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useAppSelector } from "../hook";

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);



function TodoListComponent() {
    const { ListToDo }: {
        ListToDo: TToDo[];
        selectedToDo: {};
    } = useAppSelector((state) => state.todoList) || [];
    

    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date(),
    })
    const [listAfterFilter, setListAfterFilter] = useState<TToDo[] | undefined>(ListToDo)

    useEffect(() => {
        const filterdList = () => {
            const fromToday = dateRange?.from && new Date(dateRange?.from).setHours(0, 0, 0, 0);
            const toToday = dateRange?.to && new Date(dateRange?.to).setHours(0, 0, 0, 0);

            const fromDay = fromToday && Math.floor(new Date(fromToday).getTime() / 1000.0).toString()
            const toDay = toToday && Math.floor(new Date(toToday).getTime() / 1000.0).toString()

            console.log(ListToDo)
            console.log(fromDay)
            console.log(toDay)
    
            if (fromDay) {
                if (toDay) {
                    const filterByTime = ListToDo.filter((list) => list.date >= fromDay && list.date <= toDay)
                    return filterByTime
                }
                return ListToDo
            }
            return null
        }
  
        const list = filterdList()

        list ? setListAfterFilter(list) : setListAfterFilter([])
        console.log(list)
    }, [ListToDo, dateRange])
    
    return listAfterFilter
}
export default TodoListComponent;
