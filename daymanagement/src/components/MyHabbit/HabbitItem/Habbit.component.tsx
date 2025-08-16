"use client"
import { CheckMark, ChevronSmallDoubleUp, ChevronSmallTripleUp, ChevronSmallUp, Edit, Remove } from "@/components/table";
import More from "@/components/table/More";
import { useAppDispatch } from "@/lib/hook";
import { delHabbitList, setHabbitList } from "@/modules/habbitList/habbit.slice";
import { completeMyHaBBITList, delMyHaBBITList, selectMyHaBBITList, setMyHaBBITList, TMyHaBBIT, updateMyHaBBITList } from "@/modules/myHabbitList/myHabbit.slice";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

export const HabbitItem = ({ item }: {item : TMyHaBBIT }) =>  {
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(item.title ,dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.lastUpdate), 'day') > 2);
  }, [dayjs(dayjs.unix(Number(item.lastUpdate))).format("DD")])
  useEffect(() => {
    console.log(item.title ,dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.completeUpdate), 'day') > 2);
  }, [dayjs(dayjs.unix(Number(item.lastUpdate))).format("DD")])
  

  useEffect(() => {
    console.log("lastUpdate ",item.title , dayjs.unix(item.lastUpdate).diff(dayjs.unix(currentUnixTimestamp), 'day') > 2);
    console.log("currentUnixTimestamp ",item.title , dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.lastUpdate), 'day') > 2);

    if (dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.lastUpdate), 'day') > 2 || item.score < 0) {
      console.log(item.lastUpdate , dayjs.unix(item.lastUpdate).diff(dayjs.unix(currentUnixTimestamp), 'day') > 2);
      console.log(currentUnixTimestamp, dayjs.unix(item.lastUpdate).diff(dayjs.unix(currentUnixTimestamp), 'day') > 2);
      if (item.score - dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.lastUpdate), 'day') < 10 || item.score < 0) {
        dispatch(delMyHaBBITList(item.id))

        dispatch(setHabbitList({
          id: item.id || "",
          title: item.title,
          description: item.description,
          priority: item.priority,
          score: item.score,
          lastUpdate: currentUnixTimestamp,
          completeUpdate: item.completeUpdate
        }))
        
      } else {
        dispatch(updateMyHaBBITList({
          id: item.id || "",
          title: item.title,
          description: item.description,
          score: item.score - dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(item.lastUpdate), 'day'),
          priority: item.priority,
          lastUpdate: currentUnixTimestamp,
          completeUpdate: item.completeUpdate
        }))
       }
    }
      
  }, [])
  return (
    <div              
    className="cursor-pointer grid-cols-12 grid items-center justify-evenly border p-3 rounded-2xl border-white"
    >
      <div onClick={(e) => {
              e.preventDefault();
              dispatch(completeMyHaBBITList(item.id));
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
              <div onClick={(e) => {
                e.preventDefault();
                dispatch(completeMyHaBBITList(item.id));
              }}
                        className="select-none cursor-pointer flex col-span-2 gap-2 justify-start items-start">
                        {/* <Checkbox checked={item.isComplete} id="terms" /> */}
                          <label
                            htmlFor="terms"
                            className={`cursor-pointer`}>
                              {dayjs(dayjs.unix(Number(item.lastUpdate))).format("YYYY-MM-DD")}
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
            dispatch(selectMyHaBBITList(item.id));
          }}
          className="text-red-400"
          >
            <More />
        </button>
      </div>
      <div 
        className="select-none flex col-span-1 gap-2 justify-center items-center">
          <span
              className={`""`}>
            {dayjs(dayjs.unix(Number(item.completeUpdate))).format("DD")
                !=  dayjs(dayjs.unix(Number(currentUnixTimestamp))).format("DD") ? 
                <CheckCircle  /> : 
                <CheckMark  />}
          </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectMyHaBBITList(item.id));
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
            dispatch(selectMyHaBBITList(item.id));
          }}
          className="text-red-400"
          >
          <Edit />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(delMyHaBBITList(item.id));
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
