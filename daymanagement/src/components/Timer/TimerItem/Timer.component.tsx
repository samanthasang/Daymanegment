"use client"
import { CheckCircle, CheckMark, Edit, Remove } from "@/components/table";
import More from "@/components/table/More";
import { useAppDispatch } from "@/lib/hook";
import { completeTimerList, delTimerList, selectTimerList, TTimer } from "@/modules/timerList/timer.slice";
import { completeToDoList, delToDoList, selectToDoList } from "@/modules/toDoList/todo.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
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

export const TimerItem = ({ item }: {item : TTimer }) =>  {
  const dispatch = useAppDispatch();

  return (
    <div              
    className="cursor-pointer grid-cols-12 grid items-center justify-evenly border p-3 rounded-2xl border-white"
    >
      <div onClick={(e) => {
              e.preventDefault();
              !item.isComplete && dispatch(completeTimerList({ id:item.id, endDate: `${Math.floor(Date.now() / 1000)}`}));
      }}
        className="select-none cursor-pointer flex col-span-3 gap-3 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer flex justify-center items-center gap-2`}>
            {item.title}
          </label>
        </div>
      <div onClick={(e) => {
              e.preventDefault();
              !item.isComplete && dispatch(completeTimerList({ id:item.id, endDate: `${Math.floor(Date.now() / 1000)}`}));
      }}
        className="select-none cursor-pointer flex col-span-3 gap-2 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer`}>
              {dayjs(dayjs.unix(Number(item.startDate))).format("YYYY-MM-DD HH:MM")}
          </label>
        </div>
      <div onClick={(e) => {
              e.preventDefault();
              !item.isComplete && dispatch(completeTimerList({ id:item.id, endDate: `${Math.floor(Date.now() / 1000)}`}));
      }}
        className="select-none cursor-pointer flex col-span-3 gap-2 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer`}>
              {item.startDate != item.endDate && dayjs(dayjs.unix(Number(item.endDate))).format("YYYY-MM-DD HH:MM")}
          </label>
        </div>
      <div 
        className="select-none flex col-span-1 gap-2 justify-center items-center">
          <span
            className={`""`}>
            {item.isComplete ? 
              <CheckCircle  /> : 
              <CheckMark  />}
          </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectToDoList(item.id));
          }}
          className="text-red-400"
          >
            <More />
        </button>
      </div>
      <div className="flex col-span-2 gap-2 justify-end items-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectTimerList(item.id));
          }}
          className="text-red-400"
          >
          <Edit />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(delTimerList(item.id));
          }}
          className="text-red-400"
          >
          <Remove className='fill-red-500' />
        </button>
      </div>
    </div>
  );
}

export default TimerItem;
