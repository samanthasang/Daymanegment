"use client"
import { Edit, Remove } from "@/components/table";
import { useAppDispatch } from "@/lib/hook";
import { completeToDoList, delToDoList, selectToDoList, TToDo } from "@/modules/toDoList/todo.slice";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
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
    className="cursor-pointer grid-cols-5 grid items-center justify-evenly border p-3 rounded-2xl border-white"
    >
      <div className="flex gap-2 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            onClick={(e) => {
              e.preventDefault();
              dispatch(completeToDoList(item.id));
            }}
            htmlFor="terms"
            className={`cursor-pointer ${item.isComplete ? "line-through" : ""}`}>
            {item.title}
          </label>
        </div>
      <div className="flex gap-2 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            onClick={(e) => {
              e.preventDefault();
              dispatch(completeToDoList(item.id));
            }}
            htmlFor="terms"
            className={`""`}>
              {item.priority}
          </label>
        </div>
      <div className="flex gap-2 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            onClick={(e) => {
              e.preventDefault();
              dispatch(completeToDoList(item.id));
            }}
            htmlFor="terms"
            className={`""`}>
              {dayjs(dayjs.unix(Number(item.date))).format("YYYY-MM-DD")}
          </label>
        </div>
      <div className="flex gap-2 justify-center items-center">
          <span
            className={`""`}>
            {item.isComplete ? "Complete" : "not Complete"}
          </span>
      </div>
      <div className="flex gap-2 justify-end items-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectToDoList(item.id));
          }}
          className="text-red-400"
          >
          <Edit />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(delToDoList(item.id));
          }}
          className="text-red-400"
          >
          <Remove className='fill-red-500'  />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
