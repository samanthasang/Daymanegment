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
      console.log(selectedCategory);
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

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    console.log(errors);

    selectedCategory?.title
      ? dispatch(
          updateCategoryList({
            id: selectedCategory.id,
            title: data.category,
          })
        )
      : dispatch(
          setCategoryList({
            id: "",
            title: data.category,
          })
        );
    dispatch(selectCategoryList(""));
    reset();
    // onSubmitForm();
  };

  const onReset = () => {
    console.log("reset");

    dispatch(selectCategoryList(""));
    reset();
  };
  return (
    <div className="col-span-1">
      <div className="flex flex-col gap-2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
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
          {!selectedCategory?.title && (
            <Button type="submit" variant="default">
              submit
            </Button>
          )}

          {selectedCategory?.title && (
            <div className="flex gap-4">
              <Button onClick={() => onReset()} type="button" variant="default">
                reset
              </Button>
              <Button type="submit" variant="default">
                submit
              </Button>
            </div>
          )}
        </form>

        {ListCategory &&
          ListCategory?.map((li: TCategory) => (
            <CategoryList key={li.id} item={li} />
          ))}
      </div>
    </div>
  );
}
