"use client"
import { ChevronSmallDoubleUp, ChevronSmallTripleUp, ChevronSmallUp, Edit, Remove } from "@/components/table";
import More from "@/components/table/More";
import { useAppDispatch } from "@/lib/hook";
import { completeHabbitList, delHabbitList, selectHabbitList, Thabbit } from "@/modules/habbitList/habbit.slice";
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

export const HabbitItem = ({ item }: {item : Thabbit }) =>  {
  const dispatch = useAppDispatch();

  return (
    <div              
    className="cursor-pointer grid-cols-9 grid items-center justify-evenly border p-3 rounded-2xl border-white"
    >
      <div onClick={(e) => {
              e.preventDefault();
              dispatch(completeHabbitList(item.id));
      }}
        className="select-none cursor-pointer flex col-span-6 gap-3 justify-start items-start">
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
      <div 
        className="select-none flex col-span-1 gap-2 justify-center items-center">
          <span
            className={`""`}>
            {item.score || 0}
          </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectHabbitList(item.id));
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
            dispatch(selectHabbitList(item.id));
          }}
          className="text-red-400"
          >
          <Edit />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(delHabbitList(item.id));
          }}
          className="text-red-400"
          >
          <Remove className='fill-red-500' />
        </button>
      </div>
    </div>
  );
}

export default HabbitItem;
