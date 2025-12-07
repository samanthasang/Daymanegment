"use client"
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
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { selectToDoList, setToDoList, TToDo, updateToDoList } from "../../../modules/toDoList/todo.slice";

interface IFormInputs {
  todo: string
  priority: string
  date: string
}

export default function FormReminder({ onSubmitForm }:{onSubmitForm: () => void}) {

  const [date, setDate] = useState<Date>()
  const [priority, setPriority] = useState<string>()
  useEffect(() => {
    console.log(selectedToDo);
   date && console.log(Math.floor(new Date(date).getTime()/1000.0));
  }, [date,priority])
  
  
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todoList);
  const selectedToDo = todoList?.selectedToDo as TToDo;
  
    // useEffect(() => {
    //     if (!date) {
    //         setValue("date", Math.floor(new Date(date).getTime()/1000.0).toString())
    //     }
    // }, [date])

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
    if (selectedToDo && selectedToDo.id) {
      console.log(selectedToDo)
      setValue("todo", selectedToDo?.title)
      setValue("priority", selectedToDo.priority)
      setValue("date", selectedToDo.date)
      setDate( new Date(Number(selectedToDo.date) * 1000))
    }
  }, [selectedToDo])

  useEffect(() => {
    getValues()
  }, [getValues()])
  

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    console.log(date);
    
    selectedToDo?.title ? dispatch(updateToDoList(
      {
        id: selectedToDo.id,
        title: data.todo,
        date: data.date,
        priority: data.priority
      })) :
      dispatch(setToDoList({
        id: "",
        title: data.todo,
        date: data.date,
        priority: data.priority
      }))
    dispatch(selectToDoList(""))
    reset()
    onSubmitForm()
  };
  const onReset = () => {
    console.log("reset");
    
    dispatch(selectToDoList(""))
    reset()
  };
  const dateMatcher: Date | null = selectedToDo ?
    new Date(Number(getValues('date')) * 1000) : null;
  console.log(dateMatcher)
  console.log(date)

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

              {/* <Popover> */}
      {/* <PopoverTrigger asChild>
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
        name="date"
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
      /> */}
        <div className=" border-white rounded py-1">
          <Calendar
            mode="single" 
            selected={date}
            onSelect={setDate} className=" border-white rounded py-1" />
        </div>
      {/* </PopoverContent>
    </Popover> */}
                {errors.date?.message && <p className="text-xs text-red-500">{errors.date?.message}</p>}
      <Controller
        defaultValue = {''}
        name="priority"
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange } }) =>
      <Select value={getValues('priority')} onValueChange={onChange}>
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