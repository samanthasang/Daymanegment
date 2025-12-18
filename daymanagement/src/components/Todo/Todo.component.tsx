"use client"
import { cn } from "@/lib/utils";
import { TToDo } from "@/modules/toDoList/todo.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useAppDispatch, useAppSelector } from "../../lib/hook";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import SelectedTodo from "./TodoItem/SelectedTodo.component";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);



function TodoListComponent() {
  const { ListToDo }: {
    ListToDo: TToDo[];
    selectedToDo: {};
} = useAppSelector((state) => state.todoList) || [];
  useEffect(() => {
    console.log(ListToDo);
  }, [ListToDo]);
    const dispatch = useAppDispatch();
    const CategoryList = useAppSelector((state) => state.CategoryList) || {};
    const { ListCategory, selectedCategory } = CategoryList

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(),
  })
  const [listAfterFilter, setListAfterFilter] = useState< TToDo[] | undefined>(ListToDo)

  useEffect(() => {
  const filterdList = () => {
      const fromToday = dateRange?.from && new Date(dateRange?.from).setHours(0, 0, 0, 0);
      const toToday = dateRange?.to && new Date(dateRange?.to).setHours(0, 0, 0, 0);

      const fromDay = fromToday && Math.floor(new Date(fromToday).getTime()/1000.0).toString()
      const toDay = toToday && Math.floor(new Date(toToday).getTime()/1000.0).toString()

    console.log(ListToDo)
    console.log(fromDay)
    console.log(toDay)
    
    if (fromDay ) {
        if (toDay) {
          const filterByTime =  ListToDo.filter((list) => list.date >= fromDay && list.date <= toDay)
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
  
  
  const order: { [key: string]: number} = { High: 1, Medium: 2, Low: 3 }
  console.log(
      listAfterFilter && listAfterFilter.sort(function (a, b) {
          return order[a.priority] - order[b.priority];
    })
    )
  return (
    <div className="w-2/3 m-auto bg-secondary">
      <div className="w-full text-center border-b p-3">TodoList</div>
      <div className=" w-full grid grid-cols-3 h-[70vh]">
        {/* <AddToDo /> */}

        <div className="col-span-1 flex justify-center w-full px-3 border-l h-full">

        {ListToDo != null && ListToDo.length > 0 && (
            <div className="flex flex-col flex-1 gap-4 w-full h-full">
              
              <div className="h-full">
                <div className={cn("flex flex-col justify-start gap-y-3 w-full")}>
              {/* {ListToDo?.map((li: TToDo) => (
                <SelectedTodo
                  key={li.id}
                  item={li}
                />
              ))} */}
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

                  <div>
                      <Select  onValueChange={(e) => console.log(e)}>
                        <SelectTrigger className="w-full border-white rounded py-1">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                            <SelectContent>
                              {ListCategory.map((category, index) => 
                          <SelectItem key={index} value={category.title}>{category.title}</SelectItem>)}
                        </SelectContent>
                      </Select>
                  </div>



          <div className="flex justify-between w-full mx-auto h-9">
            <DrawerDialogDemo drawerType={'TodoList'} formType="add" />
            <DrawerDialogDemo drawerType={'CategoryList'} formType="add" />
            <DrawerDialogDemo drawerType={'TagList'} formType="add" />
          </div>
              </div>
              </div>
              <div className="flex justify-between w-full mx-auto h-9">
                <span>
                  {"Todos : " + `${ListToDo?.filter((todo) => todo.isComplete == true).length} / ${ListToDo?.length}`}
                </span>

              </div>
            </div>
        )}
        </div>
        <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto", 
                    ListToDo.length !== 0 ? "scroll-m-0 overflow-y-scroll" : "")}>
        <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
          {/* <div className="w-full">AddToDo</div> */}
            {listAfterFilter?.length == 0 ? 
               <div className="flex items-center justify-center rounded-2xl h-full">
              <span>
                There is nothing to show
              </span>
            </div>
          : listAfterFilter?.map((li: TToDo) => (
                <SelectedTodo
                  key={li.id}
                  item={li}
                />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default TodoListComponent;
