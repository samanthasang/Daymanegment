"use client"
import UseDateRangeComponent from "@/lib/Hooks/DateCOMPONENT";
import { cn } from "@/lib/utils";
import { TTag } from "@/modules/tag/TagList.slice";
import { TToDo } from "@/modules/toDoList/todo.slice";
import { DialogTrigger } from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../lib/hook";
import CategotySelectComponent from "../Category/CategotySelect.component";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import SelectedTodo from "./TodoItem/SelectedTodo.component";
import TagSelectComponent from "../Tags/TagSelect.component";

dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);



function TodoListComponent() {
  const { ListToDo }: {
    ListToDo: TToDo[];
    selectedToDo: {};
  } = useAppSelector((state) => state.todoList) || [];
  
  const { ListTag }: {
    ListTag: TTag[];
    selectedTag: {};
} = useAppSelector((state) => state.TagList) || [];
  useEffect(() => {
    console.log(ListToDo);
  }, [ListToDo]);

    const searchParams = useSearchParams()

  const dateFrom = searchParams.get("dateFrom")
  const hasdateFrom = searchParams.has("dateFrom")
  const dateTo = searchParams.get("dateTo")
  const hasdateTo = searchParams.has("dateTo")
  const fromTodayNow = new Date().setHours(0, 0, 0, 0);
 
  
  const [listAfterFilter, setListAfterFilter] = useState< TToDo[] | undefined>(ListToDo)

  useEffect(() => {
  const filterdList = () => {
      const fromDay = hasdateFrom ? dateFrom : Math.floor(new Date(fromTodayNow).getTime() / 1000.0).toString()
      const toDay = hasdateTo ? dateTo : Math.floor(new Date(fromTodayNow).getTime() / 1000.0).toString()

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

    list ? setListAfterFilter(list.sort((a, b) => +a.date - +b.date)) : setListAfterFilter([])
    console.log(list)
  }, [ListToDo, dateFrom, dateTo])
  
  const { selectedToDo } : any = useAppSelector((state) => state.todoList) || {};
   useEffect(() => {
         console.log("selectedToDo ", selectedToDo)
   }, [selectedToDo])
  
  const handleCategorySelect = (categoty: string) => {
    console.log("handleCategorySelect ", categoty)
  }
  
  const handleTagSelect = (tag: string) => {
    console.log("handleTagSelect ", tag)
  }
   
  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary">
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
                  <UseDateRangeComponent />

                  <div>
                      <CategotySelectComponent onClickChange={handleCategorySelect} />
                  </div>
                  <div>
                    <TagSelectComponent onClickChange={handleTagSelect} />
                  </div>



          <div className="flex justify-between w-full mx-auto h-9">
              
            <DrawerDialogDemo drawerType={'TodoList'} formType="add" > 
              <DialogTrigger asChild>
                <Button variant="outline"><span>add</span></Button>
              </DialogTrigger>
            </DrawerDialogDemo>
                    
            <DrawerDialogDemo drawerType={'CategoryList'} formType="category" >
              <DialogTrigger asChild>
                <Button variant="outline"><span>category</span></Button>
              </DialogTrigger>
            </DrawerDialogDemo>
                    
            <DrawerDialogDemo drawerType={'TagList'} formType="tag" >
              <DialogTrigger asChild>
                <Button variant="outline"><span>tag</span></Button>
              </DialogTrigger>
            </DrawerDialogDemo>
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
