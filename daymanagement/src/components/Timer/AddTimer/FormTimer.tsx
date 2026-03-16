"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/icons";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectTimerList,
  setTimerList,
  TTimer,
  updateTimerList,
} from "@/modules/timerList/timer.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

interface IFormInputs {
  title: string;
  startDate?: string;
  endDate?: string;
  category: string;
  tag: string;
}

export default function FormTimer({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
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

  useEffect(() => {
    console.log(selectedTimer);
  }, [selectedTimer]);

  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
    startDate &&
      console.log(
        Math.floor(new Date(startDate).getTime() / 1000.0).toString()
      );
    endDate &&
      console.log(Math.floor(new Date(endDate).getTime() / 1000.0).toString());
  }, [endDate, startDate]);

  useEffect(() => {
    if (selectedTimer) {
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
    console.log(data);
    console.log({
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
    });

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
              <Input
                className="!text-white w-full px-3 border-white rounded py-1"
                placeholder="Name"
                {...field}
              />
            )}
          />
          {errors.title?.message && (
            <p className="text-xs text-red-500">{errors.title?.message}</p>
          )}

          <div className="w-full flex flex-row">
            <div className="flex flex-row flex-1">
              <div className="flex-1">
                <Controller
                  defaultValue={""}
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CategotySelectComponent
                      onValueChange={handleCategory}
                      value={field.value}
                    />
                  )}
                />
                {errors.category?.message && (
                  <p className="text-xs text-red-500">
                    {errors.category?.message}
                  </p>
                )}
              </div>
              <DrawerDialogDemo drawerType={"TagList"} formType="Add Tag">
                <DialogTrigger asChild>
                  <div className="text-red-400 w-10 h-10 flex justify-center items-center">
                    <Edit />
                  </div>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>
            <div className="flex flex-row flex-1">
              <div className="flex-1">
                <Controller
                  defaultValue={""}
                  name="tag"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TagSelectComponent
                      onValueChange={handleTag}
                      value={field.value}
                    />
                  )}
                />
                {errors.tag?.message && (
                  <p className="text-xs text-red-500">{errors.tag?.message}</p>
                )}
              </div>
              <DrawerDialogDemo drawerType={"TagList"} formType="Add Tag">
                <DialogTrigger asChild>
                  <div className="text-red-400 w-10 h-10 flex justify-center items-center">
                    <Edit />
                  </div>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>
          </div>
          <div className="flex flex-row">
            <CalendarWithTime
              title="start time"
              dateValue={startDate}
              setDate={setStartDate}
            />
            {errors.startDate?.message && (
              <p className="text-xs text-red-500">
                {errors.startDate?.message}
              </p>
            )}
            <CalendarWithTime
              title="end time"
              dateValue={endDate}
              setDate={setEndDate}
            />
            {errors.startDate?.message && (
              <p className="text-xs text-red-500">
                {errors.startDate?.message}
              </p>
            )}
          </div>

          {!selectedTimer?.title && (
            <Button
              type="submit"
              variant="default"
              className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
            >
              submit
            </Button>
          )}

          {selectedTimer?.title && (
            <div className="flex gap-4">
              <Button
                onClick={() => onReset()}
                type="button"
                variant="default"
                className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
              >
                reset
              </Button>
              <Button
                type="submit"
                variant="default"
                className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
              >
                submit
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
