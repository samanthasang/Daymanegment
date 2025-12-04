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

interface IFormInputs {
  todo: string
  priority: string
  date: string
}

export default function FormTodo() {

  const [date, setDate] = useState<Date>()
  const [priority, setPriority] = useState<string>()
  useEffect(() => {
    console.log(priority);
   date && console.log(Math.floor(new Date(date).getTime()/1000.0));
  }, [date,priority])
  
  
  const dispatch = useAppDispatch();
  const { selectedToDo } : any = useAppSelector((state) => state.todoList) || {};
  
    // useEffect(() => {
    //     if (date) {
    //         setValue("date", Math.floor(new Date(date).getTime()/1000.0).toString())
    //     }
    // }, [date])
  useEffect(() => {
    if (selectedToDo && selectedToDo.id) {
      console.log(selectedToDo)
      setValue("todo", selectedToDo?.title)
      setValue("priority", selectedToDo.priority)
      setValue("date", selectedToDo.date)
      setDate( new Date(Number(selectedToDo.date) * 1000))
    }
  }, [selectedToDo])

  // const [todoList ,setTodoList]= useState<string[]>([])

// creating a schema for strings 
   const formSchema = z.object({
    todo: z.string().min(4, { message: 'Name is required' }),
    priority: z.string().min(1, { message: 'priority is required' }),
    date: z.string().min(1, { message: 'date is required' }),
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
    setValue("todo", selectedToDo?.title)
  }, [selectedToDo])

  useEffect(() => {
    getValues()
  }, [getValues()])
  

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    console.log(date);
    console.log({
        id: selectedToDo.id,
        title: data.todo,
        date:  date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.date,
        priority: data.priority
      });
    
    selectedToDo?.title ? dispatch(updateToDoList(
      {
        id: selectedToDo.id,
        title: data.todo,
        date:  date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.date,
        priority: data.priority
      })) :
      dispatch(setToDoList({
        id: "",
        title: data.todo,
        date:  date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.date,
        priority: data.priority
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
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal border-white rounded py-1 bg-transparent",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      <Controller
        name="date"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          <div className=" border-white rounded py-1">
            <Calendar mode="single" selected={date} onSelect={setDate} className=" border-white rounded py-1" />
          </div>
      }
      />
        {errors.date?.message && <p className="text-xs text-red-500">{errors.date?.message}</p>}
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
          { !selectedToDo?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
          
          { selectedToDo?.title && <div className="flex gap-4">
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