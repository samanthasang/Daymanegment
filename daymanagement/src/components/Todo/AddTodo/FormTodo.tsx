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

interface IFormInputs {
  todo: string
  priority: string
  date: string
  category: string
  tag: string
}

export default function FormTodo({ onSubmitForm }:{onSubmitForm: () => void}) {

  const [date, setDate] = useState<Date>()
  
// creating a schema for strings 
   const formSchema = z.object({
    todo: z.string().min(4, { message: 'Name is required' }),
    priority: z.string().min(1, { message: 'priority is required' }),
    category: z.string().min(1, { message: 'Category is required' }),
    tag: z.string().min(1, { message: 'Tag is required' }),
    date: z.string().min(1, { message: 'date is required' }),
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
     date && setValue("date", Math.floor(new Date(date).getTime()/1000.0).toString())
  }, [date])
  
  
  const dispatch = useAppDispatch();
  const { selectedToDo } : any = useAppSelector((state) => state.todoList) || {};
  

  useEffect(() => {
    if (selectedToDo) {
      setValue("todo", selectedToDo?.title)
      setValue("priority", selectedToDo.priority)
      setValue("category", selectedToDo.category)
      setValue("tag", selectedToDo.tag)
      setValue("date", selectedToDo.date)
      setDate(new Date(Number(selectedToDo.date) * 1000))
    }
  }, [selectedToDo, setValue])
  

  const handlePriority = (data: string) => {
    setValue("priority", data)
  }
  const handleCategory = (data: string) => {
    setValue("category", data)
  }
  const handleTag = (data: string) => {
    setValue("tag", data)
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    selectedToDo?.title ? dispatch(updateToDoList(
      {
        id: selectedToDo.id,
        title: data.todo,
        date:  date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.date,
        priority: data.priority,
        category: data.category,
        tag: data.tag
      })) :
      dispatch(setToDoList({
        id: "",
        title: data.todo,
        date:  date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.date,
        priority: data.priority,
        category: data.category,
        tag: data.tag
      }))
    dispatch(selectToDoList(""))
      setValue("date", "")
    reset()
    onSubmitForm()
  };
  const onReset = () => {
    dispatch(selectToDoList(""))
      setValue("date", "")
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
          <div className=" border-white rounded py-1 flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              month={date}
              onSelect={setDate}
              className=" border-white rounded py-1"
              captionLayout="dropdown" />
          </div>
      }
      />
        {errors.date?.message && <p className="text-xs text-red-500">{errors.date?.message}</p>}
      
      <Controller
        defaultValue = {''}
        name="priority"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          <Select onValueChange={(data) => data && handlePriority(data)} value={field.value}>
            <SelectTrigger className="w-full border-white rounded py-1">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"High"}>High</SelectItem>
              <SelectItem value={"Medium"}>Medium</SelectItem>
              <SelectItem value={"Low"}>Low</SelectItem>
            </SelectContent>
          </Select>
          }
          />
          {errors.priority?.message && <p className="text-xs text-red-500">{errors.priority?.message}</p>}
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
        { !selectedToDo?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
        
        { selectedToDo?.title && <div className="flex gap-4">
          <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
          <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
        </div>}
      </form>
      </div>
    </div>
  );
}