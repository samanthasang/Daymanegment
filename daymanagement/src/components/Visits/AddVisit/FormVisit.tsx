"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/icons";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textareainput";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  setShareList,
  TShare,
  updateShareList,
} from "@/modules/share/share.slice";
import {
  selectVisitList,
  setVisitList,
  updateVisitList,
} from "@/modules/visitsList/visit.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { nanoid } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IFormInputs {
  title: string;
  income: boolean;
  date: string;
  description?: string;
  shareList?: TShare[];
  advancePayment?: string;
  paymentCompleteValue?: string;
  category: string;
  tag: string;
}

export default function FormVisits({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const [date, setDate] = useState<Date>();
  const [visitIdSelected, setVisitIdSelected] = useState<string>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    description: z.string().min(4, { message: "Description is required" }),
    income: z.boolean(),
    shareList: z
      .array(
        z.object({
          id: z.string().optional(),
          peopleId: z.string().min(4, { message: "Name is required" }),
          income: z.boolean(),
          incomeAmount: z.string().optional(),
          outcomeAmount: z.string().optional(),
          category: z.string().min(1, { message: "Category is required" }),
          visitId: z.string().optional(),
          shareId: z.string().optional(),
          tag: z.string().min(1, { message: "Tag is required" }),
          date: z.string().min(1, { message: "date is required" }),
        })
      )
      .optional(),
    advancePayment: z.string().optional(),
    paymentCompleteValue: z.string().optional(),
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
  const { selectedVisit }: any = useAppSelector((state) => state.visit) || {};

  const {
    ListShare: ListShareAll,
  }: {
    ListShare: TShare[];
  } = useAppSelector((state) => state.ShareList) || [];

  const [shareList, setSharelist] = useState<TShare[]>([
    {
      id: nanoid(),
      peopleId: "",
      date: date
        ? Math.floor(new Date(date).getTime() / 1000.0).toString()
        : Math.floor(new Date().getTime() / 1000.0).toString(),
      category: "",
      tag: "",
      income: false,
      incomeAmount: "",
      outcomeAmount: "",
      spendsId: "",
      visitId: "",
    },
  ]);

  useEffect(() => {
    if (selectedVisit) {
      setValue("title", selectedVisit?.title);
      setValue("description", selectedVisit.description);
      setValue("income", selectedVisit.income);
      setValue("shareList", selectedVisit.shareList);
      setValue("advancePayment", selectedVisit.advancePayment);
      setValue("paymentCompleteValue", selectedVisit.paymentCompleteValue);
      setValue("category", selectedVisit.category);
      setValue("tag", selectedVisit.tag);
      setValue("date", selectedVisit.date);
      setDate(new Date(Number(selectedVisit.date) * 1000));
      setSharelist(selectedVisit.shareList);
      setVisitIdSelected(selectedVisit.id);
    }
  }, [selectedVisit, setValue]);

  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  useEffect(() => {
    console.log(errors);
    console.log(getValues());
    console.log(selectedVisit);
  }, [getValues(), errors]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    console.log(selectedVisit);
    const visitId = visitIdSelected ? visitIdSelected : nanoid();
    console.log(visitId);

    visitIdSelected
      ? dispatch(
          updateVisitList({
            id: visitId,
            title: data.title,
            income: data.income || false,
            description: data.description || "",
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            shareList: shareList || [],
            advancePayment: data.advancePayment || "",
            paymentCompleteValue: data.paymentCompleteValue || "",
            category: data.category,
            tag: data.tag,
          })
        )
      : dispatch(
          setVisitList({
            id: visitId,
            title: data.title,
            income: data.income || false,
            description: data.description || "",
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            shareList: shareList || [],
            advancePayment: data.advancePayment || "",
            paymentCompleteValue: data.paymentCompleteValue || "",
            category: data.category,
            tag: data.tag,
          })
        );
    if (shareList.length > 0) {
      shareList.map((share) => {
        const result = ListShareAll.find((obj) => obj.id === share.id);
        console.log("ListShareAll ", ListShareAll);
        console.log("share.id ", share.id);
        console.log("result ", result);

        result
          ? dispatch(
              updateShareList({
                id: share.id || "",
                peopleId: share.peopleId,
                income: share.income || false,
                date: date
                  ? Math.floor(new Date(date).getTime() / 1000.0).toString()
                  : share.date,
                incomeAmount: share.incomeAmount || "",
                outcomeAmount: share.outcomeAmount || "",
                visitId: visitId,
                category: share.category,
                tag: share.tag,
              })
            )
          : dispatch(
              setShareList({
                id: share.id || "",
                peopleId: share.peopleId,
                income: share.income || false,
                date: date
                  ? Math.floor(new Date(date).getTime() / 1000.0).toString()
                  : share.date,
                incomeAmount: share.incomeAmount || "",
                outcomeAmount: share.outcomeAmount || "",
                visitId: visitId,
                category: share.category,
                tag: share.tag,
              })
            );
      });
    }
    dispatch(selectVisitList(""));
    setValue("date", "");
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectVisitList(""));
    setValue("date", "");
    reset();
  };

  console.log("shareList ", shareList);

  const onChangeShare = (share: TShare) => {
    const result = shareList.find((obj) => obj.id === share.id);
    console.log(result);

    if (result) {
      const shareArray =
        share &&
        shareList.map((shareItem) =>
          shareItem.id == share.id
            ? {
                ...shareItem,
                id: shareItem.id,
                peopleId: share.peopleId,
                income: share.income,
                date: getValues("date"),
                incomeAmount: share.incomeAmount,
                outcomeAmount: share.outcomeAmount,
                shareId: getValues("date"),
                visitId: "",
                category: getValues("category"),
                tag: getValues("tag"),
              }
            : shareItem
        );
      console.log(shareArray);
      console.log(shareArray);

      setValue("shareList", shareArray);
      setSharelist(shareArray);
    } else {
      const newShareList = [
        ...shareList,
        {
          id: share.id || nanoid(),
          peopleId: share.peopleId,
          income: share.income,
          date: getValues("date"),
          incomeAmount: share.incomeAmount,
          outcomeAmount: share.outcomeAmount,
          shareId: getValues("date"),
          visitId: "",
          category: getValues("category"),
          tag: getValues("tag"),
        },
      ];
      console.log(shareList);
      console.log(newShareList);
      setValue("shareList", newShareList);
      setSharelist(newShareList);
    }
  };
  const onChangeShareSubmit = () => {
    const shareArray = shareList.map((shareItem) => ({
      id: shareItem.id,
      peopleId: shareItem.peopleId,
      income: shareItem.income,
      date: getValues("date"),
      incomeAmount: shareItem.incomeAmount,
      outcomeAmount: shareItem.outcomeAmount,
      shareId: getValues("date"),
      visitId: "",
      category: getValues("category"),
      tag: getValues("tag"),
    }));
    console.log(shareArray);
    console.log(shareArray);

    setValue("shareList", shareArray);
    setSharelist(shareArray);
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
              {watch("income") && (
                <div>
                  {/* <Controller
                    defaultValue={""}
                    name="shareList"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        className="!text-white w-full px-3 border-white rounded py-1"
                        placeholder="Share of others"
                        type="tel"
                        {...field}
                      />
                    )}
                  />
                  {errors.shareList?.message && (
                    <p className="text-xs text-red-500">
                      {errors.shareList?.message}
                    </p>
                  )} */}

                  <DrawerDialogDemo
                    drawerType={"ShareListDetails"}
                    formType="Share List Details"
                    errors={errors}
                    shareList={shareList || []}
                    onSubmitForm={onChangeShareSubmit}
                    onChangeShare={onChangeShare}
                  >
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">
                        <div className="w-full flex flex-row justify-between">
                          <span>add people</span>
                          <span>
                            {shareList && shareList.length
                              ? shareList.length
                              : 0}
                          </span>
                        </div>
                      </Button>
                    </DialogTrigger>
                  </DrawerDialogDemo>

                  <Controller
                    defaultValue={""}
                    name="advancePayment"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        className="!text-white w-full px-3 border-white rounded py-1"
                        placeholder="Advance Payment"
                        type="tel"
                        {...field}
                      />
                    )}
                  />
                  {errors.advancePayment?.message && (
                    <p className="text-xs text-red-500">
                      {errors.advancePayment?.message}
                    </p>
                  )}
                  <Controller
                    defaultValue={""}
                    name="paymentCompleteValue"
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
                  {watch("income") && errors.paymentCompleteValue?.message && (
                    <p className="text-xs text-red-500">
                      {errors.paymentCompleteValue?.message}
                    </p>
                  )}
                </div>
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
                <DrawerDialogDemo
                  drawerType={"CategoryList"}
                  formType="Add Category"
                >
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
                        onValueChange={handleTag}
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
              {/* <Button
                disabled
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border-white rounded py-1 bg-transparent",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button> */}
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className=" border-white rounded py-1 flex justify-center">
                    <CalendarWithTime
                      dateValue={date}
                      setDate={setDate}
                      title="visit time"
                    />
                  </div>
                )}
              />
              {errors.date?.message && (
                <p className="text-xs text-red-500">{errors.date?.message}</p>
              )}
            </div>
          </div>

          <Controller
            defaultValue={""}
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Textarea
                className="!text-white w-full px-3 border-white rounded py-1"
                placeholder="Description"
                {...field}
              />
            )}
          />
          {errors.description?.message && (
            <p className="text-xs text-red-500">
              {errors.description?.message}
            </p>
          )}
          {!selectedVisit?.title && (
            <Button
              type="submit"
              className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
            >
              submit
            </Button>
          )}

          {selectedVisit?.title && (
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
