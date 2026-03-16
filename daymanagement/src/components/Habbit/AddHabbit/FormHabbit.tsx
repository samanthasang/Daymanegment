"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  delHabbitList,
  selectHabbitList,
  setHabbitList,
  updateHabbitList,
} from "@/modules/habbitList/habbit.slice";
import { setMyHabbitList } from "@/modules/myHabbitList/myHabbit.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const currentUnixTimestamp = dayjs().unix();
interface IFormInputs {
  title: string;
  description?: string;
  priority: string;
  category: string;
  tag: string;
}

export default function FormHabbit({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const dispatch = useAppDispatch();
  const { selectedhabbit }: any =
    useAppSelector((state) => state.habbitList) || {};

  useEffect(() => {
    console.log(selectedhabbit);
  }, [selectedhabbit]);

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Title is required" }),
    description: z.string().optional(),
    priority: z.string().min(1, { message: "priority is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
  });
  type FormData = z.infer<typeof formSchema>;
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setValue("title", selectedhabbit?.title);
    setValue("description", selectedhabbit?.description);
    setValue("priority", selectedhabbit?.priority);
    setValue("category", selectedhabbit?.category);
    setValue("tag", selectedhabbit?.tag);
  }, [selectedhabbit]);

  const handlePriority = (data: string) => {
    setValue("priority", data);
  };
  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

    selectedhabbit?.title
      ? selectedhabbit.score > 9
        ? (dispatch(
            setMyHabbitList({
              id: selectedhabbit.id,
              title: data.title,
              description: data.description || "",
              score: selectedhabbit.score,
              priority: data.priority,
              lastUpdate: Math.floor(
                new Date(currentUnixTimestamp).getTime()
              ).toString(),
              completeUpdate: selectedhabbit
                ? selectedhabbit.completeUpdate
                : currentUnixTimestamp,
              category: data.category,
              tag: data.tag,
            })
          ),
          dispatch(delHabbitList(selectedhabbit.id)))
        : dispatch(
            updateHabbitList({
              id: selectedhabbit.id,
              title: data.title,
              description: data.description || "",
              priority: data.priority,
              completeUpdate: selectedhabbit
                ? selectedhabbit.completeUpdate
                : currentUnixTimestamp,
              lastUpdate: selectedhabbit
                ? selectedhabbit.lastUpdate
                : currentUnixTimestamp,
              score: selectedhabbit.score,
              category: data.category,
              tag: data.tag,
            })
          )
      : dispatch(
          setHabbitList({
            id: nanoid(),
            title: data.title,
            description: data.description || "",
            priority: data.priority,
            completeUpdate: selectedhabbit ? selectedhabbit.completeUpdate : "",
            lastUpdate: selectedhabbit ? selectedhabbit.lastUpdate : "",
            score: selectedhabbit ? selectedhabbit.score : 1,
            category: data.category,
            tag: data.tag,
          })
        );
    selectedhabbit &&
      (selectedhabbit?.title
        ? toast(`${data.title} is updated`)
        : toast(`${data.title} is created`));
    dispatch(selectHabbitList(""));
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    console.log("reset");

    dispatch(selectHabbitList(""));
    reset();
  };

  return (
    <div className="col-span-1">
      <div className="flex flex-row gap-2 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <Controller
            defaultValue={""}
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputField
                title="Title"
                type="string"
                // className="!text-white w-full px-3 border-white rounded py-1"
                placeholder="Enter Task Name"
                disabled={!!errors.title?.message}
                required
                {...field}
              />
            )}
          />

          <Controller
            defaultValue={""}
            name="priority"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectField
                title="Priority"
                placeholder="Choose Priority"
                required
                invalid={!field.value && !!errors.priority?.message}
                itemArray={[
                  { id: "High", title: "High" },
                  { id: "Medium", title: "Medium" },
                  { id: "Low", title: "Low" },
                ]}
                onValueChange={(data) => data && handlePriority(data)}
                value={field.value}
                className={`${!field.value && errors.priority?.message ? "border-[1px] border-red-600" : ""}`}
                {...register("priority")}
              />
            )}
          />
          <div className="flex flex-row">
            <div className="flex-1">
              <Controller
                defaultValue={""}
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <CategotySelectComponent
                    required
                    errors={!field.value && !!errors.category?.message}
                    description={errors.category?.message}
                    onValueChange={handleCategory}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex-1">
              <Controller
                defaultValue={""}
                name="tag"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TagSelectComponent
                    required
                    errors={!field.value && !!errors.tag?.message}
                    description={errors.tag?.message}
                    onValueChange={handleTag}
                    value={field.value}
                  />
                )}
              />
            </div>
          </div>

          <Controller
            defaultValue={""}
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextAreaField
                className="!text-white h-32 w-full px-3 border-white rounded py-1"
                placeholder="Description"
                {...field}
              />
            )}
          />
          {!selectedhabbit?.title && (
            <Button type="submit" variant="default">
              submit
            </Button>
          )}

          {selectedhabbit?.title && (
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
      </div>
    </div>
  );
}
