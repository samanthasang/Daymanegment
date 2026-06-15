"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import FormButtons from "@/components/FormItem/FormButton";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { cn } from "@/lib/utils";
import {
  selectReminderList,
  setReminderList,
  updateReminderList,
} from "@/modules/reminderList/reminder.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IFormInputs {
  title: string;
  timeDiff: string;
  priodDiff: string;
  priority: string;
  doDate: number;
  createDate?: number;
  lastUpdate?: number;
  description?: string;
  category: string;
  tag: string;
}

export default function FormReminder({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { selectedReminder } = useReminderList();
  const t: any = UseLangComponent("Form");
  const tPriority: any = UseLangComponent("Priority");

  const [date, setDate] = useState<Date>();

  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    priority: z.string().min(1, { message: "priority is required" }),
    timeDiff: z.string().min(1, { message: "Number Diffrence is required" }),
    priodDiff: z.string().min(1, { message: "Priod Diffrence is required" }),
    doDate: z.number().min(1, { message: "date is required" }),
    createDate: z.number().optional(),
    lastUpdate: z.number().optional(),
    category: z.string().min(1, { message: "category is required" }),
    tag: z.string().min(1, { message: "tag is required" }),
    description: z.string().optional(),
  });

  type FormData = z.infer<typeof formSchema>;
  const {
    control,
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    date && setValue("doDate", Math.floor(new Date(date).getTime() / 1000.0));
  }, [date]);

  useEffect(() => {
    if (formType != "Add" && selectedReminder && selectedReminder.id) {
      setValue("title", selectedReminder?.title);
      setValue("priority", selectedReminder.priority);
      setValue("timeDiff", selectedReminder?.timeDiff);
      setValue("priodDiff", selectedReminder.priodDiff);
      setValue("category", selectedReminder.category);
      setValue("tag", selectedReminder.tag);
      setValue("description", selectedReminder?.description);
      setValue("doDate", selectedReminder.doDate);
      setValue(
        "createDate",
        selectedReminder.createDate ?? +selectedReminder.doDate
      );
      setValue(
        "lastUpdate",
        selectedReminder.lastUpdate ?? +selectedReminder.doDate
      );
      setDate(new Date(Number(selectedReminder.doDate) * 1000));
    }
  }, [selectedReminder]);

  const handlePriority = (data: string) => {
    setValue("priority", data);
  };
  const handlePriod = (data: string) => {
    setValue("priodDiff", data);
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
          updateReminderList({
            id: selectedReminder.id,
            title: data.title,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            priority: data.priority,
            category: data.category,
            timeDiff: data.timeDiff,
            priodDiff: data.priodDiff,
            description: data.description || "",
            tag: data.tag,
          })
        )
      : dispatch(
          setReminderList({
            id: "",
            title: data.title,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            priority: data.priority,
            category: data.category,
            timeDiff: data.timeDiff,
            priodDiff: data.priodDiff,
            description: data.description || "",
            tag: data.tag,
          })
        );
    setValue("doDate", 0);

    formType == "Edit"
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);

    dispatch(selectReminderList(""));
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    dispatch(selectReminderList(""));
    setValue("doDate", 0);
    reset();
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
        name="timeDiff"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputField
            title="Title"
            type="number"
            placeholder={t.repeat}
            disabled={!!errors.timeDiff?.message}
            required
            {...field}
          />
        )}
      />
      <Controller
        defaultValue={""}
        name="priodDiff"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <SelectField
            title="priodDiff"
            placeholder={t.ChoosePriod}
            required
            invalid={!field.value && !!errors.priodDiff?.message}
            itemArray={[
              { id: "hour", title: t.hour },
              { id: "day", title: t.day },
              { id: "month", title: t.month },
              { id: "year", title: t.year },
            ]}
            onValueChange={(data) => data && handlePriod(data)}
            {...field}
            value={field.value}
            className={cn(
              !field.value && errors.priodDiff?.message
                ? "border-[1px] border-red-600"
                : ""
            )}
            {...register("priodDiff")}
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
      />
      <FormButtons onReset={() => onReset()} resetOn={formType != "Add"} />
    </form>
  );
}
