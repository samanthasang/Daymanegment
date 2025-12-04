"use client"
import { Button } from "@/components/ui/button";
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
import { selectToDoList, setToDoList, updateToDoList } from "../../../modules/toDoList/todo.slice";
import { selectHabbitList, setHabbitList, updateHabbitList } from "@/modules/habbitList/habbit.slice";
import { Textarea } from "@/components/ui/textArea";

interface IFormInputs {
  habbit: string
  description: string
  priority: string
}

export default function FormHabbit() {
  
  const dispatch = useAppDispatch();
  const { selectedhabbit }: any = useAppSelector((state) => state.habbitList) || {};
  
  useEffect(() => {
    console.log(selectedhabbit);
  }, [selectedhabbit]);
  
  

// creating a schema for strings 
   const formSchema = z.object({
    habbit: z.string().min(4, { message: 'Name is required' }),
    description: z.string().min(4, { message: 'Description is required' }),
    priority: z.string().min(1, { message: 'priority is required' }),
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
    setValue("habbit", selectedhabbit?.title)
    setValue("description", selectedhabbit?.description)
    setValue("priority", selectedhabbit?.priority)
  }, [selectedhabbit])

  useEffect(() => {
    getValues()
  }, [getValues()])
  

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    
    selectedhabbit?.title ? dispatch(updateHabbitList(
      {
        id: selectedhabbit.id,
        title: data.habbit,
        description: data.description,
        priority: data.priority,
      })) :
      dispatch(setHabbitList({
        id: "",
        title: data.habbit,
        description: data.description,
        priority: data.priority,
      }))
    dispatch(selectHabbitList(""))
    reset()
  };
  const onReset = () => {
    console.log("reset");
    
    dispatch(selectHabbitList(""))
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
        name="habbit"
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
                {errors.habbit?.message && <p className="text-xs text-red-500">{errors.habbit?.message}</p>}
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
          { !selectedhabbit?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
          
          { selectedhabbit?.title && <div className="flex gap-4">
            <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
            <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
          </div>}
      </form>
      </div>
      {/* <div className="flex flex-col gap-4 w-full bg-white red col-span-2">
            {habbitList?.map((li) => (
              <div
                key={li}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(updatehabbitList(li.id));
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