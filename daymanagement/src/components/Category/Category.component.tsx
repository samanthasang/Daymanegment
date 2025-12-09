"use client"
import { useAppDispatch } from "@/lib/hook";
import { TCategory } from "@/modules/category/categoryList.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from "react";
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);


export const CategoryList = ({ item }: {item : TCategory }) =>  {
  const dispatch = useAppDispatch();
    const [isExpanded, setIsVisible] = useState(false)


  return (
        <div  
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
        </div>
     
        </div>
  );
}

export default CategoryList;
