"use client"
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/table";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
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
import { DialogTrigger } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { selectToDoList, setToDoList, updateToDoList } from "../../../modules/toDoList/todo.slice";
import { selectTimerList, setTimerList, TTimer, updateTimerList } from "@/modules/timerList/timer.slice";

import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime)
dayjs.extend(duration)
dayjs.extend(utc);
dayjs.extend(timezone);


const currentUnixTimestamp = dayjs().unix();
interface IFormInputs {
  todo: string
  startDate?: string
  endDate?: string
  category: string
  tag: string
}

export default function FormTimer({ onSubmitForm }:{onSubmitForm: () => void}) {

  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  
// creating a schema for strings 
   const formSchema = z.object({
    todo: z.string().min(4, { message: 'Name is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    tag: z.string().min(1, { message: 'Tag is required' }),
    startDate: z.string().min(1, { message: 'date is required' }).optional(),
    endDate: z.string().min(1, { message: 'date is required' }).optional(),
  });
  type FormData = z.infer<typeof formSchema>

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset
  } = methods;

  useEffect(() => {
     startDate && setValue("startDate", Math.floor(new Date(startDate).getTime()/1000.0).toString())
  }, [startDate])
  
  
  const dispatch = useAppDispatch();
  
    const { ListTimer, selectedTimer }: {
        ListTimer: TTimer[];
        selectedTimer: any;
    } = useAppSelector((state) => state.TimerList) || [];
    
    useEffect(() => {
    console.log(ListTimer);
    }, [ListTimer]);
  
  const handleCategory = (data: string) => {
    setValue("category", data)
  }
  const handleTag = (data: string) => {
    setValue("tag", data)
  }

  useEffect(() => {
    if (selectedTimer) {
      setValue("todo", selectedTimer?.title)
      setValue("category", selectedTimer.category)
      setValue("tag", selectedTimer.tag)
      setValue("startDate", selectedTimer.startDate)
      setValue("endDate", selectedTimer.endDate)
      setStartDate(new Date(Number(selectedTimer.startDate) * 1000))
      setEndDate(new Date(Number(selectedTimer.endDate) * 1000))
    }
  }, [selectedTimer, setValue])
  
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
     selectedTimer?.title ? dispatch(updateTimerList(
      {
        id: selectedTimer.id,
        title: data.todo,
        startDate:  startDate ? Math.floor(new Date(startDate).getTime()/1000.0).toString() : data.startDate as string,
        endDate: endDate ? Math.floor(new Date(endDate).getTime() / 1000.0).toString() : data.startDate as string,
        isComplete: selectedTimer.isComplete,
        category: data.category,
        tag: data.tag
       }
     )) :
      dispatch(setTimerList({
        id: "",
        title: `timer${ListTimer.length}`,
        startDate:  startDate ? Math.floor(new Date(startDate).getTime()/1000.0).toString() : data.startDate as string,
        endDate:  endDate ? Math.floor(new Date(endDate).getTime()/1000.0).toString() : data.startDate as string,
        isComplete: false,
        category: data.category,
        tag: data.tag
      }))
    dispatch(selectTimerList(""))
      setValue("startDate", "")
      setValue("endDate", "")
    reset()
    onSubmitForm()
  };
  const onReset = () => {
    dispatch(selectTimerList(""))
      setValue("startDate", "")
      setValue("endDate", "")
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
        name="todo"
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
        {errors.todo?.message && <p className="text-xs text-red-500">{errors.todo?.message}</p>}

          <Button
            disabled
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-white rounded py-1 bg-transparent",
            !startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {startDate ? format(startDate, "PPP") : <span>Pick a startDate</span>}
        </Button>
      <Controller
        name="startDate"
        control={control}
        rules={{ required: false }}
        render={({ field }) =>
          <div className=" border-white rounded py-1 flex justify-center">
            <Calendar
              mode="single"
              selected={startDate}
              month={startDate}
              onSelect={setStartDate}
              className=" border-white rounded py-1"
              captionLayout="dropdown" />
          </div>
      }
      />
        {errors.startDate?.message && <p className="text-xs text-red-500">{errors.startDate?.message}</p>}
      <div className="flex flex-row">
            <div className="flex-1">
              <Controller
                defaultValue = {''}
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <CategotySelectComponent onClickChange={handleCategory} value={field.value} />
                  }
              />
              {errors.category?.message && <p className="text-xs text-red-500">{errors.category?.message}</p>}
            </div>
            <DrawerDialogDemo drawerType={'TagList'} formType="Add Tag">
              <DialogTrigger asChild>
                <div className="text-red-400 w-10 h-10 flex justify-center items-center" >
                  <Edit />
                </div> 
              </DialogTrigger>
            </DrawerDialogDemo>
          </div>
          
          <div className="flex flex-row">
            <div className="flex-1">
                <Controller
                  defaultValue = {''}
                  name="tag"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) =>
                    <TagSelectComponent onClickChange={handleTag} value={field.value} />
                    }
                />
                {errors.tag?.message && <p className="text-xs text-red-500">{errors.tag?.message}</p>}
              </div>
              <DrawerDialogDemo drawerType={'TagList'} formType="Add Tag">
                <DialogTrigger asChild>
                  <div className="text-red-400 w-10 h-10 flex justify-center items-center" >
                    <Edit />
                  </div> 
                </DialogTrigger>
              </DrawerDialogDemo>
          </div>
        { !selectedTimer?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
        
        { selectedTimer?.title && <div className="flex gap-4">
          <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
          <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
        </div>}
      </form>
      </div>
    </div>
  );
}