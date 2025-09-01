"use client"
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popovers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { selectTimerList, setTimerList, updateTimerList } from "@/modules/timerList/timer.slice";
import dayjs from "dayjs";

interface IFormInputs {
  title: string
  startDate: string
  endDate: string
}

export default function FormTimer() {

  const [date, setDate] = useState<Date>()
  const [priority, setPriority] = useState<string>()
  useEffect(() => {
    console.log(priority);
   date && console.log(Math.floor(new Date(date).getTime()/1000.0));
  }, [date,priority])
  
  
  const dispatch = useAppDispatch();
  const { selectedTimer } : any = useAppSelector((state) => state.TimerList) || {};
  
    useEffect(() => {
        if (selectedTimer) {
            setValue("title", selectedTimer.title)
            setValue("startDate", dayjs(dayjs.unix(Number(selectedTimer.startDate))).format("YYYY-MM-DD HH:MM"))
            setValue("endDate", dayjs(dayjs.unix(Number(selectedTimer.startDate))).format("YYYY-MM-DD HH:MM"))
        }
    }, [selectedTimer])

  // const [titleList ,settitleList]= useState<string[]>([])

  console.log(selectedTimer);
  
// creating a schema for strings 
   const formSchema = z.object({
    title: z.string().min(4, { message: 'Name is required' }),
    startDate: z.string().min(1, { message: 'date is required' }),
    endDate: z.string().min(1, { message: 'date is required' }),
  });
  type FormData = z.infer<typeof formSchema>
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
  resolver: zodResolver(formSchema),
  });
  
  useEffect(() => {
    setValue("title", selectedTimer?.title)
  }, [selectedTimer])

  useEffect(() => {
    getValues()
  }, [getValues()])
  

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    
    selectedTimer?.title ? dispatch(updateTimerList(
      {
        id: selectedTimer.id,
        title: data.title,
        startDate: data.startDate || selectedTimer.startDate,
        endDate: data.endDate || selectedTimer.endDate,
        isComplete: selectedTimer.isComplete
      })) :
      dispatch(setTimerList({
        id: "",
        title: data.title,
        startDate: data.startDate || selectedTimer.startDate,
        endDate: data.endDate || selectedTimer.endDate,
        isComplete: selectedTimer.isComplete
      }))
    dispatch(selectTimerList(""))
    reset()
  };
  const onReset = () => {
    console.log("reset");
    
    dispatch(selectTimerList(""))
    reset()
  };

  return (
    <div className="col-span-1">
      <div className="flex flex-row gap-2 ">

      <form 
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4">
          
      <Controller
        defaultValue = {''}
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          <Input
            className="!text-white w-full px-3 border-white rounded py-1"
            placeholder="Name"
            {...field}
        />
      }
      />
                {errors.title?.message && <p className="text-xs text-red-500">{errors.title?.message}</p>}

              <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-white rounded py-1 bg-transparent",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
      <Controller
        name="startDate"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
        <Select 
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue  placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
      }
      />
        <div className=" border-white rounded py-1">
          <Calendar mode="single" selected={date} onSelect={setDate} className=" border-white rounded py-1" />
        </div>
      </PopoverContent>
    </Popover>
                {errors.startDate?.message && <p className="text-xs text-red-500">{errors.startDate?.message}</p>}

                {/* {errors.priority?.message && <p className="text-xs text-red-500">{errors.priority?.message}</p>} */}
          { !selectedTimer?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
          
          { selectedTimer?.title && <div className="flex gap-4">
            <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
            <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
          </div>}
      </form>
      </div>
      {/* <div className="flex flex-col gap-4 w-full bg-white red col-span-2">
            {titleList?.map((li) => (
              <div
                key={li}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(updatetitleList(li.id));
                }}
                className="flex items-center justify-between text-black"
              >
                <span className={`${li ? "line-through" : ""}`}>
                  {li}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // dispatch(deltitleList(li.id));
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div> */}
    </div>
  );
}