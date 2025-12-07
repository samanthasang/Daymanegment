"use client"
import { ChevronSmallUp, CheckCircle, CheckMark, Edit, Remove, ChevronSmallTripleUp, ChevronSmallDoubleUp } from "@/components/table";
import { useAppDispatch } from "@/lib/hook";
import { completeToDoList, delToDoList, selectToDoList, TToDo } from "@/modules/toDoList/todo.slice";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import More from "@/components/table/More";
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);

// export type ToDo = {
//   id: string
//   title: string
//   isComplete: boolean
//   date: string
//   priority: string
// }

export const TodoItem = ({ item }: {item : TToDo }) =>  {
  const dispatch = useAppDispatch();

  return (
    <div              
    className="cursor-pointer flex flex-row items-center justify-between border p-1 rounded-2xl border-white"
    >
      <div
        onClick={(e) => {
            e.preventDefault();
            dispatch(selectToDoList(item.id));
          }}
        className="select-none cursor-pointer flex  gap-3 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer flex justify-center items-center gap-2`}>
            
            { item.priority == "High" && <ChevronSmallTripleUp className='fill-red-500' />}
            { item.priority == "Medium" && <ChevronSmallDoubleUp className='fill-red-500' />}
            { item.priority == "Low" && <ChevronSmallUp className='fill-red-500' />}
            {item.title}
          </label>
        </div>
      <div>
        <span
        onClick={(e) => {
              e.preventDefault();
              dispatch(completeToDoList(item.id));
      }}
            className={`""`}>
            {item.isComplete ? 
              <CheckCircle  /> : 
              <CheckMark  />}
        </span>
      </div>
    </div>
  );
}

export default TodoItem;
