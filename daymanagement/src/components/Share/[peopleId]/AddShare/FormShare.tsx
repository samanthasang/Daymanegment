"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import PeopleSelectComponent from "@/components/People/PeopleSelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectShareList,
  setShareList,
  updateShareList,
} from "@/modules/share/share.slice";
import { updateVisitListShare } from "@/modules/visitsList/visit.slice";
import { zodResolver } from "@hookform/resolvers/zod";
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
    selectedShare.visitId &&
      dispatch(
        updateVisitListShare({
          id: selectedShare.id,
          peopleId: data.peopleId,
          income: data.income || false,
          date: date
            ? Math.floor(new Date(date).getTime() / 1000.0).toString()
            : data.date,
          visitId: selectedShare.visitId,
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
              <Controller
                defaultValue={""}
                name="peopleId"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <PeopleSelectComponent
                    errors={!!errors.peopleId?.message}
                    description={errors.peopleId?.message}
                    onValueChange={handlePeople}
                    value={field.value}
                  />
                )}
              />

              <ClendarButtonGroup
                dateValue={date}
                errors={!!errors.category?.message}
                description={errors.category?.message}
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
                name="income"
                control={control}
                render={({ field }) => (
                  <div className="w-full flex h-8 border border-input bg-transparent px-3 py-1 text-base shadow-sm  justify-between rounded-xl ">
                    <label className="text-white/50">
                      {!field.value ? "Send" : "Recive"}
                    </label>
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
                  </div>
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
                      <InputField
                        title="Title"
                        type="number"
                        // className="!text-white w-full px-3 border-white rounded py-1"
                        placeholder="Outcome Amount"
                        disabled={!!errors.outcomeAmount?.message}
                        content={errors.outcomeAmount?.message}
                        required
                        {...field}
                      />
                    )}
                  />
                </div>
              )}

              {watch("income") && (
                <Controller
                  defaultValue={""}
                  name="incomeAmount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      title="Title"
                      type="string"
                      // className="!text-white w-full px-3 border-white rounded py-1"
                      placeholder="Income Amount"
                      disabled={!!errors.incomeAmount?.message}
                      content={errors.incomeAmount?.message}
                      required
                      {...field}
                    />
                  )}
                />
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
                        required
                        errors={!!errors.category?.message}
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
                        errors={!!errors.tag?.message}
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

          {!selectedShare?.peopleId && (
            <Button
              type="submit"
              variant="default"
              className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
            >
              submit
            </Button>
          )}

          {selectedShare?.peopleId && (
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
