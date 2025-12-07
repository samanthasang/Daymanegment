"use client"
import { ChevronSmallUp, CheckCircle, CheckMark, Edit, Remove, ChevronSmallTripleUp, ChevronSmallDoubleUp } from "@/components/table";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { completeToDoList, delToDoList, selectToDoList, TToDo } from "@/modules/toDoList/todo.slice";
import { Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { AnimatePresence, delay, motion } from "motion/react"
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import More from "@/components/table/More";
import { useEffect, useState } from "react";
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);


export const SelectedTodo = ({ item }: {item : TToDo }) =>  {
  const dispatch = useAppDispatch();
    const [isExpanded, setIsVisible] = useState(false)


  return (
      <AnimatePresence >
        <motion.div  
      initial={{ height: 80 }}
      animate={{ height: isExpanded ? 250 : 80 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: "hidden" }}
    className=" cursor-pointer flex flex-row items-start justify-start border p-3 rounded-2xl border-white"
      >
        <div className=" h-fit w-full flex flex-col"  onClick={() => setIsVisible(!isExpanded)}>
      <div 
        className=" select-none cursor-pointer flex col-span-6 gap-3 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer flex justify-center items-center gap-2`}>
            {item.title}
          </label>
        </div>
      <div 
        className="select-none cursor-pointer flex col-span-3 gap-2 justify-start items-start">
          <label
            htmlFor="terms"
            className={`cursor-pointer flex justify-center items-center gap-2`}>
            
            { item.priority == "High" && <ChevronSmallTripleUp className='fill-red-500' />}
            { item.priority == "Medium" && <ChevronSmallDoubleUp className='fill-red-500' />}
            { item.priority == "Low" && <ChevronSmallUp className='fill-red-500' />}
            {item.priority}
          </label>
        </div> <AnimatePresence initial={false}>
                    <motion.div
      initial={{ height: 0 }}
      animate={{ height: isExpanded ? "auto" : 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: "hidden" }}
                        key="box"
            >
      <div 
        className="flex flex-col select-none cursor-pointer col-span-3 gap-2 justify-start items-start">
        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer`}>
              {dayjs(dayjs.unix(Number(item.date))).format("YYYY-MM-DD")}
          </label>
          <label
            htmlFor="terms"
            className={`cursor-pointer`}>
              {dayjs(dayjs.unix(Number(item.date))).format("YYYY-MM-DD")}
          </label>
          <label
            htmlFor="terms"
            className={`cursor-pointer`}>
              {dayjs(dayjs.unix(Number(item.date))).format("YYYY-MM-DD")}
          </label>
          <label
            htmlFor="terms"
            className={`cursor-pointer`}>
              {dayjs(dayjs.unix(Number(item.date))).format("YYYY-MM-DD")}
          </label>
          </div>
            </motion.div>
            </AnimatePresence>
        </div>
        <AnimatePresence initial={false}>
                    <motion.div
      initial={{ height: 20 }}
      animate={{ height: isExpanded ? 150 : 20 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: "hidden" }}
                        key="box"
            >
              <div className="flex flex-col col-span-2 gap-2 justify-end items-end">
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
          <Remove className='fill-red-500' />
        </button>
              </div>
            </motion.div>
                
         
            </AnimatePresence>
      
        </motion.div>
      </AnimatePresence>
  );
}

export default SelectedTodo;
