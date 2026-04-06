"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { InputField } from "@/components/ui/inputField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectTimerList,
  setTimerList,
  TTimer,
  updateTimerList,
} from "@/modules/timerList/timer.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IFormInputs {
  title: string;
  startDate?: string;
  endDate?: string;
  category: string;
  tag: string;
}

export default function FormTimer({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    startDate: z.string().min(1, { message: "date is required" }).optional(),
    endDate: z.string().min(1, { message: "date is required" }).optional(),
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
  } = methods;

  useEffect(() => {
    startDate &&
      setValue(
        "startDate",
        Math.floor(new Date(startDate).getTime() / 1000.0).toString()
      );
  }, [startDate]);

  useEffect(() => {
    endDate &&
      setValue(
        "endDate",
        Math.floor(new Date(endDate).getTime() / 1000.0).toString()
      );
  }, [endDate]);

  const dispatch = useAppDispatch();

  const {
    ListTimer,
    selectedTimer,
  }: {
    ListTimer: TTimer[];
    selectedTimer: any;
  } = useAppSelector((state) => state.TimerList) || [];

  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  // useEffect(() => {
  //   console.log(startDate);
  //   console.log(endDate);
  //   startDate &&
  //     console.log(
  //       Math.floor(new Date(startDate).getTime() / 1000.0).toString()
  //     );
  //   endDate &&
  //     console.log(Math.floor(new Date(endDate).getTime() / 1000.0).toString());
  // }, [endDate, startDate]);

  useEffect(() => {
    if (formType.split(" ")[0] == "Edit" && selectedTimer) {
      setValue("title", selectedTimer?.title);
      setValue("category", selectedTimer.category);
      setValue("tag", selectedTimer.tag);
      setValue("startDate", selectedTimer.startDate);
      setValue("endDate", selectedTimer.endDate);
      setStartDate(new Date(Number(selectedTimer.startDate) * 1000));
      setEndDate(new Date(Number(selectedTimer.endDate) * 1000));
    }
  }, [selectedTimer, setValue]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    selectedTimer?.title
      ? dispatch(
          updateTimerList({
            id: selectedTimer.id,
            title: data.title,
            startDate: startDate
              ? Math.floor(new Date(startDate).getTime() / 1000.0).toString()
              : (data.startDate as string),
            endDate: endDate
              ? Math.floor(new Date(endDate).getTime() / 1000.0).toString()
              : (data.startDate as string),
            isComplete:
              startDate &&
              endDate &&
              Math.floor(new Date(startDate).getTime() / 1000.0) ==
                Math.floor(new Date(endDate).getTime() / 1000.0)
                ? selectedTimer.isComplete
                : true,
            category: data.category,
            tag: data.tag,
          })
        )
      : dispatch(
          setTimerList({
            id: "",
            title: `timer${ListTimer.length}`,
            startDate: startDate
              ? Math.floor(new Date(startDate).getTime() / 1000.0).toString()
              : (data.startDate as string),
            endDate: endDate
              ? Math.floor(new Date(endDate).getTime() / 1000.0).toString()
              : (data.startDate as string),
            isComplete: false,
            category: data.category,
            tag: data.tag,
          })
        );
    dispatch(selectTimerList(""));
    setValue("startDate", "");
    setValue("endDate", "");
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    dispatch(selectTimerList(""));
    setValue("startDate", "");
    setValue("endDate", "");
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
            placeholder="Enter Reminder Name"
            disabled={!!errors.title?.message}
            required
            {...field}
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
            description={errors.category?.message}
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
            description={errors.tag?.message}
            onValueChange={handleTag}
            value={field.value}
          />
        )}
      />

      <CalendarWithTime
        title="start time"
        dateValue={startDate}
        setDate={setStartDate}
        message={!startDate && !!errors.startDate?.message}
      />

      <CalendarWithTime
        title="end time"
        dateValue={endDate}
        setDate={setEndDate}
        message={!endDate && !!errors.endDate?.message}
      />

      <div className="flex gap-4">
        {selectedTimer?.title && (
          <Button onClick={() => onReset()} type="button">
            reset
          </Button>
        )}
        <Button type="submit" variant="default">
          submit
        </Button>
      </div>
    </form>
  );
}
