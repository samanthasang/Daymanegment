"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import PeopleSelectComponent from "@/components/Friends/PeopleSelect.component";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import {
  selectShareList,
  setShareList,
  updateShareList,
} from "@/modules/share/share.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IFormInputs {
  title: string;
  peopleId: string;
  income?: boolean;
  doDate: number;
  createDate?: number;
  incomeAmount?: string;
  outcomeAmount?: string;
  shareId?: string;
  visitId?: string;
  category: string;
  tag: string;
  description?: string;
}

export default function FormShare({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const [date, setDate] = useState<Date>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Title is required" }),
    peopleId: z.string().min(4, { message: "Name is required" }),
    income: z.boolean().optional(),
    incomeAmount: z.string().optional(),
    outcomeAmount: z.string().optional(),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
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
    getValues,
    watch,
  } = methods;

  useEffect(() => {
    date && setValue("doDate", Math.floor(new Date(date).getTime() / 1000.0));
  }, [date]);

  const dispatch = useAppDispatch();
  const { selectedShare }: any = useAppSelector((state) => state.Shares) || {};

  useEffect(() => {
    if (formType != "Add" && selectedShare) {
      setValue("title", selectedShare?.title);
      setValue("peopleId", selectedShare?.peopleId);
      setValue("income", selectedShare.income);
      setValue("incomeAmount", selectedShare.incomeAmount);
      setValue("outcomeAmount", selectedShare.outcomeAmount);
      setValue("category", selectedShare.category);
      setValue("tag", selectedShare.tag);
      setValue("description", selectedShare?.description);
      setValue("doDate", selectedShare.doDate);
      setValue(
        "createDate",
        selectedShare.createDate
          ? +selectedShare.createDate
          : +selectedShare.doDate
      );
      setDate(new Date(Number(selectedShare.doDate) * 1000));
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

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    formType == "Edit"
      ? dispatch(
          updateShareList({
            id: selectedShare.id,
            title: data.title,
            peopleId: data.peopleId,
            income: data.income || false,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            createDate: data.createDate ? +data.createDate : data.doDate,
            incomeAmount: data.income ? data.incomeAmount : "",
            outcomeAmount: !data.income ? data.outcomeAmount : "",
            category: data.category,
            tag: data.tag,
            description: data.description || "",
          })
        )
      : dispatch(
          setShareList({
            id: "",
            title: data.title,
            peopleId: data.peopleId,
            income: data.income || false,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            createDate: currentUnixTimestamp,
            incomeAmount: data.income ? data.incomeAmount : "",
            outcomeAmount: !data.income ? data.outcomeAmount : "",
            category: data.category,
            tag: data.tag,
            description: data.description || "",
          })
        );
    // selectedShare &&
    //   selectedShare.visitId &&
    //   dispatch(
    //     updateVisitListShare({
    //       id: selectedShare.id,
    //       peopleId: data.peopleId,
    //       income: data.income || false,
    //       doDate: date
    //         ? Math.floor(new Date(date).getTime() / 1000.0)
    //         : data.doDate,
    //       createDate: data.createDate ?? data.doDate,
    //       visitId: selectedShare.visitId,
    //       incomeAmount: data.income ? data.incomeAmount : "",
    //       outcomeAmount: !data.income ? data.outcomeAmount : "",
    //       category: data.category,
    //       tag: data.tag,
    //     })
    //   );
    dispatch(selectShareList(""));
    setValue("doDate", 0);
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectShareList(""));
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
            placeholder="Enter Share Name"
            disabled={!!errors.title?.message}
            required
            {...field}
          />
        )}
      />
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
          name="doDate"
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
      <div className="bg-primary p-2 rounded-2xl flex flex-col gap-y-2">
        <div className="w-full flex justify-center items-center gap-x-2 bg-primary rounded-full">
          <div
            className={cn(
              "cursor-pointer w-full text-center py-1 rounded-2xl hover:bg-card/15",
              !getValues("income")
                ? "bg-card/15 text-card"
                : "text-TextForeground hover:text-white"
            )}
            onClick={() => setValue("income", false)}
          >
            Outcome
          </div>
          <div
            className={cn(
              "cursor-pointer w-full text-center py-1 rounded-2xl hover:bg-card/15",
              !!getValues("income")
                ? "bg-card/15 text-card"
                : "text-TextForeground "
            )}
            onClick={() => setValue("income", true)}
          >
            Income
          </div>
        </div>
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
      </div>
      <Controller
        defaultValue={""}
        name="category"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <CategotySelectComponent
            required
            errors={!!errors.category?.message}
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
            errors={!!errors.tag?.message}
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

      <div className="flex gap-4">
        {formType != "Add" && selectedShare?.title && (
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
