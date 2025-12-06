"use client"
import { ChevronSmallUp, CheckCircle, CheckMark, Edit, Remove, ChevronSmallTripleUp, ChevronSmallDoubleUp } from "@/components/table";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
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

export const SelectedTodo = () =>  {
  const dispatch = useAppDispatch();
  const { selectedToDo } : any = useAppSelector((state) => state.todoList) || {};

  return (
    selectedToDo ?
    <div              
    className="cursor-pointer flex-1 flex flex-row items-start justify-start border p-3 rounded-2xl border-white"
      >
        <div className="w-full flex flex-col">
      <div 
        className="select-none cursor-pointer flex col-span-6 gap-3 justify-start items-start">
        {/* <Checkbox checked={selectedToDo.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer flex justify-center items-center gap-2`}>
            
            { selectedToDo.priority == "High" && <ChevronSmallTripleUp className='fill-red-500' />}
            { selectedToDo.priority == "Medium" && <ChevronSmallDoubleUp className='fill-red-500' />}
            { selectedToDo.priority == "Low" && <ChevronSmallUp className='fill-red-500' />}
            {selectedToDo.title}
          </label>
        </div>
      <div 
        className="select-none cursor-pointer flex col-span-3 gap-2 justify-start items-start">
        {/* <Checkbox checked={selectedToDo.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer`}>
              {dayjs(dayjs.unix(Number(selectedToDo.date))).format("YYYY-MM-DD")}
          </label>
          </div>
        </div>
      <div className="flex flex-col col-span-2 gap-2 justify-end items-end">
          <span
            className={`""`}>
            {selectedToDo.isComplete ? 
              <CheckCircle  /> : 
              <CheckMark  />}
          </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectToDoList(selectedToDo.id));
          }}
          className="text-red-400"
          >
            <More />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectToDoList(selectedToDo.id));
          }}
          className="text-red-400"
          >
          <Edit />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(delToDoList(selectedToDo.id));
          }}
          className="text-red-400"
          >
          <Remove className='fill-red-500' />
        </button>
      </div>
      </div> : 
      <div className="h-full w-full flex items-center justify-center">
        <span className="text-muted-foreground">No ToDo Selected</span>
      </div>
  );
}

export default SelectedTodo;
