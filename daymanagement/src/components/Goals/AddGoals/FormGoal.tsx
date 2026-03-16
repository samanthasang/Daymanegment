"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  selectGoalList,
  setGoalList,
  updateGoalList,
} from "../../../modules/goalsList/goals.slice";
import dayjs from "dayjs";

const currentUnixTimestamp = dayjs().unix();

interface IFormInputs {
  title: string;
  priority: string;
  date: string;
  category: string;
  score?: number;
  tag: string;
}

export default function FormGoals({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const [date, setDate] = useState<Date>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    priority: z.string().min(1, { message: "priority is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    score: z.number().optional(),
    date: z.string().min(1, { message: "date is required" }),
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
    date &&
      setValue(
        "date",
        Math.floor(new Date(date).getTime() / 1000.0).toString()
      );
  }, [date]);

  const dispatch = useAppDispatch();
  const { selectedGoal }: any = useAppSelector((state) => state.Goals) || {};

  useEffect(() => {
    if (selectedGoal) {
      setValue("title", selectedGoal?.title);
      setValue("priority", selectedGoal.priority);
      setValue("category", selectedGoal.category);
      setValue("tag", selectedGoal.tag);
      setValue("date", selectedGoal.date);
      setDate(new Date(Number(selectedGoal.date) * 1000));
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
    console.log(dayjs.unix(Number(currentUnixTimestamp)));
    console.log(date);
    console.log(data.date);
    console.log(dayjs.unix(Number(date)));

    console.log(
      dayjs.unix(currentUnixTimestamp).diff(dayjs.unix(Number(date)), "day")
    );
    console.log(
      dayjs
        .unix(currentUnixTimestamp)
        .diff(dayjs.unix(Number(data.date)), "day")
    );

    selectedGoal?.title
      ? dispatch(
          updateGoalList({
            id: selectedGoal.id,
            title: data.title,
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            priority: data.priority,
            category: data.category,
            tag: data.tag,
            score:
              dayjs
                .unix(Number(data.date))
                .diff(dayjs.unix(currentUnixTimestamp), "day") || 0,
          })
        )
      : dispatch(
          setGoalList({
            id: "",
            title: data.title,
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            priority: data.priority,
            category: data.category,
            tag: data.tag,
            score:
              dayjs
                .unix(Number(data.date))
                .diff(dayjs.unix(currentUnixTimestamp), "day") || 0,
          })
        );
    dispatch(selectGoalList(""));
    setValue("date", "");
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    dispatch(selectGoalList(""));
    setValue("date", "");
    reset();
  };

  return (
    <div className="col-span-1 w-auto">
      <div className="flex flex-row gap-2 w-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full gap-4"
        >
          <div className="flex flex-col sm:flex-row w-full gap-x-4">
            <div className="w-1/2 min-w-60 flex flex-col gap-y-4">
              <Controller
                defaultValue={""}
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    title="Title"
                    type="string"
                    placeholder="Enter Task Name"
                    disabled={!!errors.title?.message}
                    required
                    {...field}
                  />
                )}
              />

              <ClendarButtonGroup
                dateValue={date}
                errors={!date && !!errors.date?.message}
                // description={errors.category?.message}
              >
                <Controller
                  name="date"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <CalendarDialog
                      required
                      mode="single"
                      selected={date}
                      month={date}
                      onSelect={setDate}
                      className=" border-white rounded py-1"
                      captionLayout="dropdown"
                      title="a"
                      dateValue={date}
                      setDate={setDate}
                    />
                  )}
                />
              </ClendarButtonGroup>

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
                    {...field}
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
            </div>
          </div>

          {!selectedGoal?.title && (
            <Button type="submit" variant="default">
              submit
            </Button>
          )}

          {selectedGoal?.title && (
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
