"use client";
import { useAppDispatch } from "@/lib/hook";
import { delPeopleList, TPeople } from "@/modules/people/PeopleList.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState } from "react";
import { Trash } from "../icons";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const PeopleItem = ({ item }: { item: TPeople }) => {
  const dispatch = useAppDispatch();
  const [isExpanded, setIsVisible] = useState(false);

  return (
    <div className=" cursor-pointer flex flex-row items-start justify-start border p-3 rounded-2xl border-white">
      <div
        className=" h-fit w-full flex flex-row justify-between items-center"
        onClick={() => setIsVisible(!isExpanded)}
      >
        <div className=" select-none cursor-pointer flex col-span-6 gap-3 justify-start items-start">
          {/* <Checkbox checked={item.isComplete} id="terms" /> */}
          <label
            htmlFor="terms"
            className={`cursor-pointer flex justify-center items-center gap-2`}
          >
            {item.title}
          </label>
        </div>
        <div
          onClick={(e) => {
            e && e.preventDefault();
            item.id && dispatch(delPeopleList(item.id));
          }}
          className="flex justify-center items-center h-5 w-5 bg-white/80 rounded-full"
        >
          <Trash />
        </div>
      </div>
    </div>
  );
};

export default PeopleItem;
