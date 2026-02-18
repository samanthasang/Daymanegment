"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/icons";
import PeopleSelectComponent from "@/components/People/PeopleSelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import {
  selectShareList,
  setShareList,
  updateShareList,
} from "@/modules/share/share.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IFormInputs {
  peopleId: string;
  income?: boolean;
  date: string;
  incomeAmount?: string;
  outcomeAmount?: string;
  shareId?: string;
  visitId?: string;
  category: string;
  tag: string;
}

export default function FormShare({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const [date, setDate] = useState<Date>();

  // creating a schema for strings
  const formSchema = z.object({
    peopleId: z.string().min(4, { message: "Name is required" }),
    income: z.boolean().optional(),
    incomeAmount: z.string().optional(),
    outcomeAmount: z.string().optional(),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
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
    getValues,
    watch,
  } = methods;

  useEffect(() => {
    date &&
      setValue(
        "date",
        Math.floor(new Date(date).getTime() / 1000.0).toString()
      );
  }, [date]);

  const dispatch = useAppDispatch();
  const { selectedShare }: any =
    useAppSelector((state) => state.ShareList) || {};

  useEffect(() => {
    if (selectedShare) {
      setValue("peopleId", selectedShare?.peopleId);
      setValue("income", selectedShare.income);
      setValue("incomeAmount", selectedShare.incomeAmount);
      setValue("outcomeAmount", selectedShare.outcomeAmount);
      setValue("category", selectedShare.category);
      setValue("tag", selectedShare.tag);
      setValue("date", selectedShare.date);
      setDate(new Date(Number(selectedShare.date) * 1000));
    }
  }, [selectedShare, setValue]);

  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };
  const handlePeople = (data: string) => {
    setValue("peopleId", data);
  };

  useEffect(() => {
    console.log(errors);
    console.log(getValues());
  }, [getValues(), errors]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

    selectedShare?.peopleId
      ? dispatch(
          updateShareList({
            id: selectedShare.id,
            peopleId: data.peopleId,
            income: data.income || false,
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            incomeAmount: data.incomeAmount || "",
            outcomeAmount: data.outcomeAmount || "",
            category: data.category,
            tag: data.tag,
          })
        )
      : dispatch(
          setShareList({
            id: "",
            peopleId: data.peopleId,
            income: data.income || false,
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            incomeAmount: data.incomeAmount || "",
            outcomeAmount: data.outcomeAmount || "",
            category: data.category,
            tag: data.tag,
          })
        );
    dispatch(selectShareList(""));
    setValue("date", "");
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectShareList(""));
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
              <div className="flex flex-row">
                <div className="flex-1">
                  <Controller
                    defaultValue={""}
                    name="peopleId"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <PeopleSelectComponent
                        onClickChange={handlePeople}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.peopleId?.message && (
                    <p className="text-xs text-red-500">
                      {errors.peopleId?.message}
                    </p>
                  )}
                </div>
                <DrawerDialogDemo
                  drawerType={"PeopleList"}
                  formType="Add People"
                >
                  <DialogTrigger asChild>
                    <div className="text-red-400 w-10 h-10 flex justify-center items-center">
                      <Edit />
                    </div>
                  </DialogTrigger>
                </DrawerDialogDemo>
              </div>

              <Controller
                name="income"
                control={control}
                render={({ field }) => (
                  <BasicSwitch
                    checked={!!field.value}
                    handleToggle={() => {
                      console.log(!field.value);

                      // field.onChange(!field.value as boolean)
                      setValue("income", !field.value);
                    }}
                    label=""
                    key={"income"}
                  />
                )}
              />
              {!watch("income") && (
                <div>
                  <Controller
                    defaultValue={""}
                    name="outcomeAmount"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        className="!text-white w-full px-3 border-white rounded py-1"
                        placeholder="Outcome Amount"
                        type="tel"
                        {...field}
                      />
                    )}
                  />
                  {errors.outcomeAmount?.message && (
                    <p className="text-xs text-red-500">
                      {errors.outcomeAmount?.message}
                    </p>
                  )}
                </div>
              )}

              {watch("income") && (
                <Controller
                  defaultValue={""}
                  name="incomeAmount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      className="!text-white w-full px-3 border-white rounded py-1"
                      placeholder="Income Amount"
                      type="tel"
                      {...field}
                    />
                  )}
                />
              )}
              {watch("income") && errors.incomeAmount?.message && (
                <p className="text-xs text-red-500">
                  {errors.incomeAmount?.message}
                </p>
              )}

              <div className="flex flex-row">
                <div className="flex-1">
                  <Controller
                    defaultValue={""}
                    name="category"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CategotySelectComponent
                        onClickChange={handleCategory}
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

              <div className="flex flex-row">
                <div className="flex-1">
                  <Controller
                    defaultValue={""}
                    name="tag"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TagSelectComponent
                        onClickChange={handleTag}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.tag?.message && (
                    <p className="text-xs text-red-500">
                      {errors.tag?.message}
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
            </div>
            <div>
              <Button
                disabled
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border-white rounded py-1 bg-transparent",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className=" border-white rounded py-1 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      month={date}
                      onSelect={setDate}
                      className=" border-white rounded py-1"
                      captionLayout="dropdown"
                    />
                  </div>
                )}
              />
              {errors.date?.message && (
                <p className="text-xs text-red-500">{errors.date?.message}</p>
              )}
            </div>
          </div>

          {!selectedShare?.peopleId && (
            <Button
              type="submit"
              className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
            >
              submit
            </Button>
          )}

          {selectedShare?.peopleId && (
            <div className="flex gap-4">
              <Button
                onClick={() => onReset()}
                type="button"
                className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
              >
                reset
              </Button>
              <Button
                type="submit"
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
