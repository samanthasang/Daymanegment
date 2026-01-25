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
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Edit } from "@/components/table";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { cn } from "@/lib/utils";
import { selectReminderList, setReminderList, TReminder, updateReminderList } from "@/modules/reminderList/reminder.slice";

interface IFormInputs {
  todo: string
  timeDiff: string
  priodDiff: string
  priority: string
  date: string
  category: string
  tag: string
}

export default function FormReminder({ onSubmitForm }:{onSubmitForm: () => void}) {

  const [date, setDate] = useState<Date>()

  const dispatch = useAppDispatch();
  const reminder = useAppSelector((state) => state.reminder);
  const selectedReminder = reminder?.selectedReminder as TReminder;
  
   const formSchema = z.object({
    todo: z.string().min(4, { message: 'Name is required' }),
    priority: z.string().min(1, { message: 'priority is required' }),
    timeDiff: z.string().min(1, { message: 'Number Diffrence is required' }),
    priodDiff: z.string().min(1, { message: 'Priod Diffrence is required' }),
    date: z.string().min(1, { message: 'date is required' }),
    category: z.string().min(1, { message: 'category is required' }),
    tag: z.string().min(1, { message: 'tag is required' }),
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
    if (selectedReminder && selectedReminder.id) {
      console.log(selectedReminder)
      setValue("todo", selectedReminder?.title)
      setValue("priority", selectedReminder.priority)
      setValue("timeDiff", selectedReminder?.timeDiff)
      setValue("priodDiff", selectedReminder.priodDiff)
      setValue("category", selectedReminder.category)
      setValue("tag", selectedReminder.tag)
      setValue("date", selectedReminder.date)
      setDate( new Date(Number(selectedReminder.date) * 1000))
    }
  }, [selectedReminder])

  useEffect(() => {
     date && setValue("date", Math.floor(new Date(date).getTime()/1000.0).toString())
  }, [date])
  
  const handlePriority = (data: string) => {
    setValue("priority", data)
  }
  const handlePriod = (data: string) => {
    setValue("priodDiff", data)
  }
  const handleCategory = (data: string) => {
    setValue("category", data)
  }
  const handleTag = (data: string) => {
    setValue("tag", data)
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    console.log(date);
    
    selectedReminder?.title ? dispatch(updateReminderList(
      {
        id: selectedReminder.id,
        title: data.todo,
        date:  date ? Math.floor(new Date(date).getTime()/1000.0).toString() : data.date,
        priority: data.priority,
        category: data.category,
        timeDiff: data.timeDiff,
        priodDiff: data.priodDiff,
        tag: data.tag,
      })) :
      dispatch(setReminderList({
        id: "",
        title: data.todo,
        date: data.date,
        priority: data.priority,
        category: data.category,
        timeDiff: data.timeDiff,
        priodDiff: data.priodDiff,
        tag: data.tag,
      }))
    dispatch(selectReminderList(""))
    reset()
    onSubmitForm()
  };
  const onReset = () => {
    console.log("reset");
    
    dispatch(selectReminderList(""))
    setValue("date", "")
    reset()
  };
  console.log(date)

  return (
    <div className="col-span-1 w-auto">
      <div className="flex flex-row gap-2 w-auto">

      <form 
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4">
          
          <div className="flex flex-col sm:flex-row w-full gap-x-4">
            <div className="w-1/2 min-w-60 flex flex-col gap-y-4">

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
              
              <Controller
                defaultValue = {''}
                name="timeDiff"
                control={control}
                rules={{ required: true }}
                render={({ field }) =>
                  <Input
                    type="number"
                    className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Number for Repeat"
                    {...field}
                  />
                }
              />
              {errors.timeDiff?.message && <p className="text-xs text-red-500">{errors.timeDiff?.message}</p>}

      <Controller
        defaultValue = {''}
        name="priodDiff"
        control={control}
        rules={{ required: true }}
        render={({ field }) =>
          <Select onValueChange={(data) => data && handlePriod(data)} value={field.value}>
            <SelectTrigger className="w-full border-white rounded py-1">
              <SelectValue placeholder="Priod for repeat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"hour"}>Hour</SelectItem>
              <SelectItem value={"day"}>Day</SelectItem>
              <SelectItem value={"month"}>Mounth</SelectItem>
              <SelectItem value={"year"}>Year</SelectItem>
            </SelectContent>
          </Select>
          }
          />
          {errors.priodDiff?.message && <p className="text-xs text-red-500">{errors.priodDiff?.message}</p>}
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

            </div>
            <div>
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
      </div>
          </div>
      
        { !selectedReminder?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
        
        { selectedReminder?.title && <div className="flex gap-4">
          <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
          <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
        </div>}
      </form>
      </div>
    </div>
  );
}