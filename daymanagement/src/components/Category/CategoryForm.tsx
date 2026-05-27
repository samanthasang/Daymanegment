"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectCategoryList,
  setCategoryList,
  TCategory,
  updateCategoryList,
} from "@/modules/category/categoryList.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { InputField } from "../ui/inputField";
import { CategoryList } from "./Category.component";

export default function CategoryForm() {
  const dispatch = useAppDispatch();
  const { ListCategory, selectedCategory }: any =
    useAppSelector((state) => state.CategoryList) || {};

  useEffect(() => {
    if (selectedCategory && selectedCategory.id) {
      setValue("category", selectedCategory?.title);
    }
  }, [selectedCategory]);

  // creating a schema for strings
  const formSchema = z.object({
    category: z.string().min(3, { message: "Category is required" }),
  });
  type FormData = z.infer<typeof formSchema>;
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {
    selectedCategory?.id
      ? dispatch(
          updateCategoryList({
            id: selectedCategory.id,
            title: getValues("category"),
          })
        )
      : dispatch(
          setCategoryList({
            id: "",
            title: getValues("category"),
          })
        );
    dispatch(selectCategoryList(""));
    reset();
  };

  const onReset = () => {
    dispatch(selectCategoryList(""));
    reset();
  };
  return (
    <div className="flex flex-col gap-2 min-w-96">
      <form className="flex flex-col w-full gap-4">
        <Controller
          defaultValue={""}
          name="category"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <InputField
              title="Title"
              type="string"
              placeholder="Enter Name"
              disabled={!!errors.category?.message}
              required
              {...field}
            />
          )}
        />
        <div className="flex gap-4">
          {selectedCategory?.id && (
            <Button type="button" className="flex-1" onClick={() => onReset()}>
              reset
            </Button>
          )}
          <Button
            type="button"
            variant="default"
            className="flex-1"
            onClick={() => onSubmit()}
          >
            submit
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-y-2 p-1 rounded-3xl max-h-52 overflow-y-scroll">
        {ListCategory &&
          ListCategory?.map((li: TCategory) => (
            <CategoryList key={li.id} item={li} />
          ))}
      </div>
    </div>
  );
}
