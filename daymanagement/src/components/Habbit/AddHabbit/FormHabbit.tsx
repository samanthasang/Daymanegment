"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import FormButtons from "@/components/FormItem/FormButton";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import {
  currentUnixTimestamp,
  currentUnixTimestampZero,
} from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import {
  selectHabbitList,
  setHabbitList,
  updateHabbitList,
} from "@/modules/habbitList/habbit.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IFormInputs {
  title: string;
  description?: string;
  priority: string;
  category: string;
  tag: string;
  lastUpdate: number;
  createDate?: number;
}

export default function FormHabbit({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { selectedHabbit } = UseHabbitList();
  const [date, setDate] = useState<Date>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Title is required" }),
    description: z.string().optional(),
    priority: z.string().min(1, { message: "priority is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    lastUpdate: z.number().min(1, { message: "date is required" }),
    createDate: z.number().optional(),
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
    date &&
      setValue("lastUpdate", Math.floor(new Date(date).getTime() / 1000.0));
  }, [date]);

  useEffect(() => {
    if (formType != "Add" && selectedHabbit) {
      setValue("title", selectedHabbit?.title);
      setValue("description", selectedHabbit?.description);
      setValue("priority", selectedHabbit?.priority);
      setValue("category", selectedHabbit?.category);
      setValue("tag", selectedHabbit?.tag);
      setValue("lastUpdate", selectedHabbit.lastUpdate);
      setValue(
        "createDate",
        selectedHabbit.createDate ?? +selectedHabbit.lastUpdate
      );
      setDate(new Date(Number(selectedHabbit.lastUpdate) * 1000));
    }
  }, [selectedHabbit]);

  const handlePriority = (data: string) => {
    setValue("priority", data);
  };
  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  const onReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    formType == "Edit"
      ? dispatch(
          updateHabbitList({
            id: selectedHabbit.id,
            title: data.title,
            description: data.description || "",
            priority: data.priority,
            createDate: currentUnixTimestamp,
            lastUpdate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.lastUpdate,
            score: selectedHabbit.score,
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
            createDate: currentUnixTimestamp,
            lastUpdate: currentUnixTimestampZero,
            isComplete: false,
            score: 1,
            category: data.category,
            tag: data.tag,
          })
        );

    formType == "Edit"
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);

    dispatch(selectHabbitList(""));
    reset();
    onSubmitForm();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full min-w-60 flex flex-col gap-y-3"
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
            className={cn(
              !field.value && errors.priority?.message
                ? "border-[1px] border-red-600"
                : ""
            )}
            {...register("priority")}
          />
        )}
      />

      <Controller
        defaultValue={""}
        name="category"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CategotySelectComponent
            required
            errors={!field.value && !!errors.category?.message}
            onValueChange={handleCategory}
            value={field.value}
          />
        )}
      />

      <Controller
        defaultValue={""}
        name="tag"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TagSelectComponent
            required
            errors={!field.value && !!errors.tag?.message}
            onValueChange={handleTag}
            value={field.value}
          />
        )}
      />

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

      <FormButtons onReset={() => onReset()} resetOn={formType != "Add"} />
    </form>
  );
}
