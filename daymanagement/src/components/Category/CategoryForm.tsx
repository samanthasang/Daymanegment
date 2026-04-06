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
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { InputField } from "../ui/inputField";
import { CategoryList } from "./Category.component";

interface IFormInputs {
  category: string;
}

export default function CategoryForm({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
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
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = () => {
    selectedCategory?.title
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
    // onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectCategoryList(""));
    reset();
  };
  return (
    <div className="flex flex-col gap-2 ">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4"
      >
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
          {selectedCategory?.title && (
            <Button onClick={() => onReset()} type="button" variant="secondary">
              reset
            </Button>
          )}
          <Button type="button" variant="default" onClick={() => onSubmit()}>
            submit
          </Button>
        </div>
      </form>

      {ListCategory &&
        ListCategory?.map((li: TCategory) => (
          <CategoryList key={li.id} item={li} />
        ))}
    </div>
  );
}
