"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectReminderList,
  setReminderList,
  TReminder,
  updateReminderList,
} from "@/modules/reminderList/reminder.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IFormInputs {
  title: string;
  timeDiff: string;
  priodDiff: string;
  priority: string;
  date: string;
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
  const [date, setDate] = useState<Date>();

  const dispatch = useAppDispatch();
  const reminder = useAppSelector((state) => state.reminder);
  const selectedReminder = reminder?.selectedReminder as TReminder;

  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    priority: z.string().min(1, { message: "priority is required" }),
    timeDiff: z.string().min(1, { message: "Number Diffrence is required" }),
    priodDiff: z.string().min(1, { message: "Priod Diffrence is required" }),
    date: z.string().min(1, { message: "date is required" }),
    category: z.string().min(1, { message: "category is required" }),
    tag: z.string().min(1, { message: "tag is required" }),
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
    if (
      formType.split(" ")[0] == "Edit" &&
      selectedReminder &&
      selectedReminder.id
    ) {
      setValue("title", selectedReminder?.title);
      setValue("priority", selectedReminder.priority);
      setValue("timeDiff", selectedReminder?.timeDiff);
      setValue("priodDiff", selectedReminder.priodDiff);
      setValue("category", selectedReminder.category);
      setValue("tag", selectedReminder.tag);
      setValue("date", selectedReminder.date);
      setDate(new Date(Number(selectedReminder.date) * 1000));
    }
  }, [selectedReminder]);

  useEffect(() => {
    date &&
      setValue(
        "date",
        Math.floor(new Date(date).getTime() / 1000.0).toString()
      );
  }, [date]);

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
    selectedReminder?.title
      ? dispatch(
          updateReminderList({
            id: selectedReminder.id,
            title: data.title,
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            priority: data.priority,
            category: data.category,
            timeDiff: data.timeDiff,
            priodDiff: data.priodDiff,
            tag: data.tag,
          })
        )
      : dispatch(
          setReminderList({
            id: "",
            title: data.title,
            date: data.date,
            priority: data.priority,
            category: data.category,
            timeDiff: data.timeDiff,
            priodDiff: data.priodDiff,
            tag: data.tag,
          })
        );
    dispatch(selectReminderList(""));
    reset();
    onSubmitForm();
  };
  const onReset = () => {
    dispatch(selectReminderList(""));
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
            <div className="min-w-60 flex flex-col gap-y-4">
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
                    placeholder="Enter Reminder Name"
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
                name="timeDiff"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    title="Title"
                    type="number"
                    placeholder="Number for Repeat"
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
                    placeholder="Choose Priod"
                    required
                    invalid={!field.value && !!errors.priodDiff?.message}
                    itemArray={[
                      { id: "hour", title: "Hour" },
                      { id: "day", title: "Day" },
                      { id: "month", title: "Month" },
                      { id: "year", title: "Year" },
                    ]}
                    onValueChange={(data) => data && handlePriod(data)}
                    {...field}
                    value={field.value}
                    className={`${!field.value && errors.priodDiff?.message ? "border-[1px] border-red-600" : ""}`}
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

          {!selectedReminder?.title && (
            <Button type="submit" variant={"default"}>
              submit
            </Button>
          )}

          {selectedReminder?.title && (
            <div className="flex gap-4">
              <Button onClick={() => onReset()} type="button">
                reset
              </Button>
              <Button variant={"default"} type="submit">
                submit
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
