"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import {
  selectGoalList,
  setGoalList,
  updateGoalList,
} from "../../../modules/goalsList/goals.slice";
import FormButtons from "@/components/FormItem/FormButton";

interface IFormInputs {
  title: string;
  priority: string;
  doDate: number;
  createDate?: number;
  category: string;
  score?: number;
  tag: string;
  description?: string;
}

export default function FormGoals({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { selectedGoal } = useGoalsList();
  const [date, setDate] = useState<Date>();
  const t: any = UseLangComponent("Form");
  const tPriority: any = UseLangComponent("Priority");

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    priority: z.string().min(1, { message: "priority is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    score: z.number().optional(),
    doDate: z.number().min(1, { message: "date is required" }),
    createDate: z.number().optional(),
    description: z.string().optional(),
  });
  type FormData = z.infer<typeof formSchema>;

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
    register,
  } = methods;

  useEffect(() => {
    date && setValue("doDate", Math.floor(new Date(date).getTime() / 1000.0));
  }, [date]);

  useEffect(() => {
    if (formType != "Add" && selectedGoal) {
      setValue("title", selectedGoal?.title);
      setValue("priority", selectedGoal.priority);
      setValue("category", selectedGoal.category);
      setValue("tag", selectedGoal.tag);
      setValue("description", selectedGoal?.description);
      setValue("doDate", selectedGoal.doDate);
      setValue("createDate", selectedGoal.createDate ?? +selectedGoal.doDate);
      setDate(new Date(Number(selectedGoal.doDate) * 1000));
    }
  }, [selectedGoal, setValue]);

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
    formType == "Edit"
      ? dispatch(
          updateGoalList({
            id: selectedGoal.id,
            title: data.title,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            priority: data.priority,
            description: data.description || "",
            category: data.category,
            tag: data.tag,
            score: data.score ?? DayUnixDiff(data.doDate, "day") + 1,
          })
        )
      : dispatch(
          setGoalList({
            id: "",
            title: data.title,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            priority: data.priority,
            description: data.description || "",
            category: data.category,
            tag: data.tag,
            score: DayUnixDiff(data.doDate, "day") + 1,
          })
        );

    setValue("doDate", 0);

    formType == "Edit"
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);

    dispatch(selectGoalList(""));
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectGoalList(""));
    setValue("doDate", 0);
    reset();
  };

  return (
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
            placeholder={t.TaskName}
            disabled={!!errors.title?.message}
            required
            {...field}
          />
        )}
      />
      <CalendarWithTime
        dateValue={date}
        setDate={setDate}
        message={!date && !!errors.doDate?.message}
      />
      <Controller
        defaultValue={""}
        name="priority"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectField
            title={t.priority}
            placeholder={t.ChoosePriority}
            required
            invalid={!field.value && !!errors.priority?.message}
            itemArray={[
              { id: "High", title: tPriority.High },
              { id: "Medium", title: tPriority.Medium },
              { id: "Low", title: tPriority.Low },
            ]}
            onValueChange={(data) => data && handlePriority(data)}
            {...field}
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
            placeholder={t.description}
            {...field}
          />
        )}
      />{" "}
      <FormButtons onReset={() => onReset()} resetOn={formType != "Add"} />
    </form>
  );
}
