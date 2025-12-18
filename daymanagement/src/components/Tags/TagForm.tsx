"use client"
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { selectTagList, setTagList, TTag, updateTagList } from "@/modules/tag/TagList.slice";
import TagList from "./Tag.component";

interface IFormInputs {
  todo: string
}

export default function TagForm({ onSubmitForm }:{onSubmitForm: () => void}) {
  
  const dispatch = useAppDispatch();
  const { ListTag, selectedTag } : any = useAppSelector((state) => state.TagList) || {};
  

  useEffect(() => {
    if (selectedTag && selectedTag.id) {
      console.log(selectedTag)
      setValue("todo", selectedTag?.title)
    }
  }, [selectedTag])

  // const [todoList ,setTodoList]= useState<string[]>([])

// creating a schema for strings 
   const formSchema = z.object({
    todo: z.string().min(4, { message: 'Name is required' }),
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
  

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

    selectedTag?.title ? dispatch(updateTagList(
      {
        id: selectedTag.id,
        title: data.todo,
      })) :
      dispatch(setTagList({
        id: "",
        title: data.todo,
      }))
    dispatch(selectTagList(""))
    reset()
    onSubmitForm()
  };

  const onReset = () => {
    console.log("reset");
    
    dispatch(selectTagList(""))
    reset()
  };
  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-2 ">

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
            { !selectedTag?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
          
          { selectedTag?.title && <div className="flex gap-4">
            <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
            <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
          </div>}
        </form>

        {ListTag && ListTag?.map((li: TTag) => (
                        <TagList
                          key={li.id}
                          item={li}
                        />
                  ))}
      </div>
    </div>
  );
}