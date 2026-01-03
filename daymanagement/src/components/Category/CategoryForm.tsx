"use client"
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { selectCategoryList, setCategoryList, TCategory, updateCategoryList } from "@/modules/category/categoryList.slice";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { CategoryList } from "./Category.component";

interface IFormInputs {
  category: string
}

export default function CategoryForm({ onSubmitForm }:{onSubmitForm: () => void}) {
  
  const dispatch = useAppDispatch();
  const { ListCategory, selectedCategory } : any = useAppSelector((state) => state.CategoryList) || {};
  

  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      console.log(selectedCategory)
      setValue("category", selectedCategory?.title)
    }
  }, [selectedCategory])

  // const [todoList ,setTodoList]= useState<string[]>([])

// creating a schema for strings 
   const formSchema = z.object({
    category: z.string().min(3, { message: 'Category is required' }),
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
    console.log(errors);

    selectedCategory?.title ? dispatch(updateCategoryList(
      {
        id: selectedCategory.id,
        title: data.category,
      })) :
      dispatch(setCategoryList({
        id: "",
        title: data.category,
      }))
    dispatch(selectCategoryList(""))
    reset()
    onSubmitForm()
  };

  const onReset = () => {
    console.log("reset");
    
    dispatch(selectCategoryList(""))
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
          name="category"
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
          {errors.category?.message && <p className="text-xs text-red-500">{errors.category?.message}</p>}
            { !selectedCategory?.title && <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>}
          
          { selectedCategory?.title && <div className="flex gap-4">
            <Button onClick={() => onReset()}  type="button" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">reset</Button>
            <Button type="submit" className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">submit</Button>
          </div>}
        </form>

        {ListCategory && ListCategory?.map((li: TCategory) => (
                        <CategoryList
                          key={li.id}
                          item={li}
                        />
                  ))}
      </div>
    </div>
  );
}