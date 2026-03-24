"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  delShareList,
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
  id?: string;
  title: string;
  income?: boolean;
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
    description: z.string().optional(),
    income: z.boolean().optional(),
    shareList: z
      .array(
        z.object({
          id: z.string(),
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

  const [shareList, setSharelist] = useState<TShare[]>([]);

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
    const visitId = visitIdSelected ? visitIdSelected : nanoid();
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

    setValue("shareList", shareArray);
    setSharelist(shareArray);
  };

  const removeShare = (id: string) => {
    const shareArray = shareList?.filter((share) => share.id != id);
    setValue("shareList", shareArray);
    setSharelist(shareArray);
    dispatch(delShareList(id));
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
                    placeholder="Enter Visit Name"
                    disabled={!!errors.title?.message}
                    required
                    {...field}
                  />
                )}
              />
              <CalendarWithTime
                title="visit time"
                dateValue={date}
                setDate={setDate}
                message={!date && !!errors.date?.message}
              />
              <Controller
                name="income"
                control={control}
                render={({ field }) => (
                  <div className="w-full flex h-8 border border-input bg-transparent px-3 py-1 text-base shadow-sm  justify-between rounded-xl ">
                    <label className="text-white/50">With Payment</label>
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
              {watch("income") && (
                <>
                  <DrawerDialogDemo
                    drawerType={"ShareListDetails"}
                    formType="Share List Details"
                    errors={errors}
                    shareList={shareList || []}
                    onSubmitForm={onChangeShareSubmit}
                    onChangeShare={onChangeShare}
                    removeShare={removeShare}
                  >
                    <DialogTrigger asChild>
                      <Button variant="default">
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
                      <InputField
                        title="Advance Payment"
                        type="number"
                        // className="!text-white w-full px-3 border-white rounded py-1"
                        placeholder="Enter Advance Payment"
                        disabled={!!errors.advancePayment?.message}
                        content={errors.advancePayment?.message}
                        required
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    defaultValue={""}
                    name="paymentCompleteValue"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <InputField
                        title="Advance Payment"
                        type="number"
                        // className="!text-white w-full px-3 border-white rounded py-1"
                        placeholder="Enter Income Amount"
                        disabled={!!errors.paymentCompleteValue?.message}
                        content={errors.paymentCompleteValue?.message}
                        required
                        {...field}
                      />
                    )}
                  />
                </>
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
          {!selectedVisit?.title && (
            <Button type="submit" variant="default">
              submit
            </Button>
          )}

          {selectedVisit?.title && (
            <div className="flex gap-4">
              <Button onClick={() => onReset()} type="button">
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
