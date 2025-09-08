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
import { selectToDoList, setToDoList, updateToDoList } from "../../../modules/toDoList/todo.slice";
import { Input } from "@/components/ui/input";
import { setInstallmentstList, updateInstallmentstList } from "@/modules/installmentstList/installmentst.slice";
import { Textarea } from "@/components/ui/textArea";
import dayjs from "dayjs";

interface IFormInputs {
  title: string
  priority: string
  startDate: number
  description: string
  paymentNumber:string
  paymentCompleteValue:string
}


const currentUnixTimestamp = dayjs().unix(); 
export default function FormInstallments() {

  const [date, setDate] = useState<Date>()
  const [priority, setPriority] = useState<string>()
  useEffect(() => {
    console.log(priority);
   date && console.log(Math.floor(new Date(date).getTime()/1000.0));
  }, [date,priority])
  
  
  const dispatch = useAppDispatch();
  const { selectedInstallmentst } : any = useAppSelector((state) => state.InstallmentstList) || {};
  
    useEffect(() => {
        if (date) {
            setValue("startDate", currentUnixTimestamp)
        }
    }, [date])

  // const [todoList ,setTodoList]= useState<string[]>([])

// creating a schema for strings 
   const formSchema = z.object({
    title: z.string().min(4, { message: 'Name is required' }),
    description: z.string().min(4, { message: 'Name is required' }),
    priority: z.string().min(1, { message: 'priority is required' }),
    startDate: z.number().min(1, { message: 'date is required' }),
    paymentNumber: z.string().min(1, { message: 'paymentNumber is required' }),
    paymentCompleteValue: z.string().min(1, { message: 'paymentCompleteValue is required' }),
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
    setValue("title", selectedInstallmentst?.title)
  }, [selectedInstallmentst])

  useEffect(() => {
    getValues()
  }, [getValues()])
  

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    
    selectedInstallmentst?.title ? dispatch(updateInstallmentstList(
      {
        id: selectedInstallmentst.id,
        title: data.title,
        description: data.description,
        priority: data.priority,
        startDate: data.startDate,
        lastUpdate: selectedInstallmentst || 0,
        completeUpdate: selectedInstallmentst || 0,
        paymentNumber: data.paymentNumber,
        paymentCompleteValue: data.paymentCompleteValue
      })) :
      dispatch(setInstallmentstList({
        id: "",
        title: data.title,
        description: data.description,
        priority: data.priority,
        startDate: data.startDate,
        lastUpdate: 0,
        completeUpdate: 0,
        paymentNumber: data.paymentNumber,
        paymentCompleteValue: data.paymentCompleteValue
      }))
    dispatch(selectToDoList(""))
    reset()
  };
  const onReset = () => {
    console.log("reset");
    
    dispatch(selectToDoList(""))
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
      <Controller
        defaultValue = {''}
        name="priority"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) =>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full border-white rounded py-1">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
      }
      />
          {errors.priority?.message && <p className="text-xs text-red-500">{errors.priority?.message}</p>}
      <Controller
        defaultValue = {""}
        name="paymentNumber"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          <Input
            className="!text-white w-full px-3 border-white rounded py-1"
            placeholder="Total Payment Number"
            type="number"
            {...field}
          />
      }
      />
          {errors.paymentNumber?.message && <p className="text-xs text-red-500">{errors.paymentNumber?.message}</p>}
      <Controller
        defaultValue = {""}
        name="paymentCompleteValue"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          <Input
            className="!text-white w-full px-3 border-white rounded py-1"
            placeholder="Total Payment"
            type="number"
            {...field}
          />
      }
      />
          {errors.paymentCompleteValue?.message && <p className="text-xs text-red-500">{errors.paymentCompleteValue?.message}</p>}
          
          <Controller
            defaultValue = {''}
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) =>
              <Textarea
                className="!text-white w-full px-3 border-white rounded py-1"
                placeholder="Description"
                {...field}
            />
          }
          />
          {errors.description?.message && <p className="text-xs text-red-500">{errors.description?.message}</p>}
     

          { !selectedInstallmentst?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
          
          { selectedInstallmentst?.title && <div className="flex gap-4">
            <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
            <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
          </div>}
      </form>
      </div>
      {/* <div className="flex flex-col gap-4 w-full bg-white red col-span-2">
            {todoList?.map((li) => (
              <div
                key={li}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(updateToDoList(li.id));
                }}
                className="flex items-center justify-between text-black"
              >
                <span className={`${li ? "line-through" : ""}`}>
                  {li}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // dispatch(delToDoList(li.id));
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