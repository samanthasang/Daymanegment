"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { InputField } from "@/components/ui/inputField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import {
  selectTimerList,
  setTimerList,
  updateTimerList,
} from "@/modules/timerList/timer.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IFormInputs {
  title: string;
  startDate: number;
  endDate?: number;
  category: string;
  createDate?: number;
  tag: string;
  description?: string;
}

export default function FormTimer({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { ListTimerAll, selectedTimer } = useTimerList();

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    startDate: z.number().min(1, { message: "date is required" }),
    endDate: z.number().min(1, { message: "date is required" }).optional(),
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
  } = methods;

  useEffect(() => {
    startDate &&
      setValue("startDate", Math.floor(new Date(startDate).getTime() / 1000.0));
  }, [startDate]);

  useEffect(() => {
    endDate &&
      setValue("endDate", Math.floor(new Date(endDate).getTime() / 1000.0));
  }, [endDate]);

  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  useEffect(() => {
    if (formType != "Add" && selectedTimer) {
      setValue("title", selectedTimer?.title);
      setValue("category", selectedTimer.category);
      setValue("tag", selectedTimer.tag);
      setValue("startDate", selectedTimer.startDate);
      setValue("endDate", selectedTimer.endDate);
      setStartDate(new Date(Number(selectedTimer.startDate) * 1000));
      setEndDate(new Date(Number(selectedTimer.endDate) * 1000));
      setValue("createDate", +selectedTimer.startDate);
      setValue("description", selectedTimer?.description);
    }
  }, [selectedTimer, setValue]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    formType == "Edit"
      ? dispatch(
          updateTimerList({
            id: selectedTimer.id,
            title: data.title,
            startDate: startDate
              ? Math.floor(new Date(startDate).getTime() / 1000.0)
              : data.startDate,
            endDate: endDate
              ? Math.floor(new Date(endDate).getTime() / 1000.0)
              : data.startDate,
            createDate:
              data.createDate && data.createDate > 0
                ? data.createDate
                : data.startDate,
            isComplete:
              startDate &&
              endDate &&
              Math.floor(new Date(startDate).getTime() / 1000.0) ==
                Math.floor(new Date(endDate).getTime() / 1000.0)
                ? selectedTimer.isComplete
                : true,
            category: data.category,
            tag: data.tag,
            description: data.description || "",
          })
        )
      : dispatch(
          setTimerList({
            id: "",
            title: `timer${ListTimerAll.length}`,
            startDate: startDate
              ? Math.floor(new Date(startDate).getTime() / 1000.0)
              : data.startDate,
            endDate: endDate
              ? Math.floor(new Date(endDate).getTime() / 1000.0)
              : data.startDate,
            createDate: currentUnixTimestamp,
            isComplete: false,
            category: data.category,
            tag: data.tag,
            description: data.description || "",
          })
        );
    setValue("startDate", 0);
    setValue("endDate", 0);

    selectedTimer?.id
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);

    dispatch(selectTimerList(""));
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    dispatch(selectTimerList(""));
    setValue("startDate", 0);
    setValue("endDate", 0);
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
      <div className="flex gap-4">
        {selectedTimer?.title && (
          <Button type="submit" className="flex-1">
            reset
          </Button>
        )}
        <Button type="submit" className="flex-1" variant="default">
          submit
        </Button>
      </div>
    </form>
  );
}
