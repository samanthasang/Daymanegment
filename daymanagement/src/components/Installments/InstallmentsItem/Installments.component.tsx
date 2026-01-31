"use client";
import {
  ChevronSmallUp,
  CheckCircle,
  CheckMark,
  Edit,
  Remove,
  ChevronSmallTripleUp,
  ChevronSmallDoubleUp,
} from "@/components/table";
import { useAppDispatch } from "@/lib/hook";
import {
  completeToDoList,
  delToDoList,
  selectToDoList,
  TToDo,
} from "@/modules/toDoList/todo.slice";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
import More from "@/components/table/More";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

// export type ToDo = {
//   id: string
//   title: string
//   isComplete: boolean
//   date: string
//   priority: string
// }

export const InstallmentsItem = ({ item }: { item: TInstallmentsts }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="cursor-pointer grid-cols-12 grid items-center justify-evenly border p-3 rounded-2xl border-white">
      <div
        onClick={(e) => {
          e.preventDefault();
          dispatch(completeToDoList(item.id));
        }}
        className="select-none cursor-pointer flex col-span-4 gap-3 justify-start items-start"
      >
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
        <label
          htmlFor="terms"
          className={`cursor-pointer flex justify-center items-center gap-2`}
        >
          {item.priority == "High" && (
            <ChevronSmallTripleUp className="fill-red-500" />
          )}
          {item.priority == "Medium" && (
            <ChevronSmallDoubleUp className="fill-red-500" />
          )}
          {item.priority == "Low" && (
            <ChevronSmallUp className="fill-red-500" />
          )}
          {item.title}
        </label>
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          dispatch(completeToDoList(item.id));
        }}
        className="select-none cursor-pointer flex col-span-2 gap-3 justify-start items-start"
      >
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
        <label
          htmlFor="terms"
          className={`cursor-pointer flex justify-center items-center gap-2`}
        >
          {item.paymentCompleteValue}
        </label>
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          dispatch(completeToDoList(item.id));
        }}
        className="select-none cursor-pointer flex col-span-3 gap-2 justify-start items-start"
      >
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
        <label htmlFor="terms" className={`cursor-pointer`}>
          {dayjs.unix(item.startDate).format("YYYY-MM-DD HH:mm")}
        </label>
      </div>
      <div className="select-none flex col-span-1 gap-2 justify-center items-center">
        <span className={`""`}>{item.paymentNumber}</span>
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
          <Remove className="fill-red-500" />
        </button>
      </div>
    </div>
  );
};

export default InstallmentsItem;
