"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { InputField } from "@/components/ui/inputField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import { currentUnixTimestamp } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import { addFriendsListShare } from "@/modules/people/PeopleList.slice";
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
import { toast } from "react-toastify";
import { z } from "zod";

interface IFormInputs {
  id?: string;
  title: string;
  income?: boolean;
  doDate: number;
  createDate?: number;
  description?: string;
  shareList?: string[];
  advancePayment?: string;
  paymentCompleteValue?: string;
  category: string;
  tag: string;
}

export default function FormVisits({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { selectedVisit } = useVisitList();

  const [date, setDate] = useState<Date>();
  const [visitIdSelected, setVisitIdSelected] = useState<string>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    description: z.string().optional(),
    income: z.boolean().optional(),
    shareList: z.array(z.string()).optional(),
    advancePayment: z.string().optional(),
    paymentCompleteValue: z.string().optional(),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    doDate: z.number().min(1, { message: "date is required" }),
    createDate: z.number().optional(),
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

  const { ListShareAll } = useShareList();

  const result =
    selectedVisit &&
    selectedVisit.shareList &&
    ListShareAll &&
    ListShareAll.filter(
      (share) => selectedVisit.shareList.includes(share.id) && share
    );
  const [shareList, setSharelist] = useState<TShare[]>([]);

  useEffect(() => {
    if (formType != "Add" && selectedVisit) {
      setValue("title", selectedVisit?.title);
      setValue("description", selectedVisit?.description);
      setValue("income", selectedVisit.income);
      setValue("shareList", selectedVisit.shareList);
      setValue("advancePayment", selectedVisit.advancePayment);
      setValue("paymentCompleteValue", selectedVisit.paymentCompleteValue);
      setValue("category", selectedVisit.category);
      setValue("tag", selectedVisit.tag);
      setValue("doDate", selectedVisit.doDate);
      setValue("createDate", selectedVisit.createDate ?? +selectedVisit.doDate);
      setDate(new Date(Number(selectedVisit.doDate) * 1000));
      setSharelist(result || []);
      setVisitIdSelected(selectedVisit.id);
    }
  }, [selectedVisit, setValue]);

  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const visitId = visitIdSelected ? visitIdSelected : nanoid();
    formType == "Edit"
      ? dispatch(
          updateVisitList({
            id: visitId,
            title: data.title,
            income: data.income || false,
            description: data.description || "",
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            createDate:
              data.createDate && data.createDate > 0
                ? data.createDate
                : data.doDate,
            shareList: shareList.map((share) => share.id) || [],
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
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            createDate: currentUnixTimestamp,
            shareList: shareList.map((share) => share.id) || [],
            advancePayment: data.advancePayment || "",
            paymentCompleteValue: data.paymentCompleteValue || "",
            category: data.category,
            tag: data.tag,
          })
        );
    if (shareList && shareList.length > 0) {
      shareList.map((share) => {
        const result = ListShareAll.find((obj) => obj.id === share.id);

        result
          ? dispatch(
              updateShareList({
                id: share.id || "",
                title: share.title,
                peopleId: share.peopleId,
                income: share.income || false,
                doDate: date
                  ? Math.floor(new Date(date).getTime() / 1000.0)
                  : share.doDate,
                createDate:
                  share.createDate && share.createDate > 0
                    ? +share.createDate
                    : share.doDate,
                incomeAmount: share.incomeAmount || "",
                outcomeAmount: share.outcomeAmount || "",
                visitId: visitId,
                category: share.category,
                tag: share.tag,
                description: share.description,
              })
            )
          : dispatch(
              setShareList({
                id: share.id || "",
                title: share.title,
                peopleId: share.peopleId,
                income: share.income || false,
                doDate: date
                  ? Math.floor(new Date(date).getTime() / 1000.0)
                  : share.doDate,
                createDate:
                  share.createDate && share.createDate > 0
                    ? +share.createDate
                    : share.doDate,
                incomeAmount: share.incomeAmount || "",
                outcomeAmount: share.outcomeAmount || "",
                visitId: visitId,
                category: share.category,
                tag: share.tag,
                description: share.description,
              })
            );
      });
      shareList.map((share) => {
        dispatch(
          addFriendsListShare({
            id: share.id,
            peopleId: share.peopleId,
          })
        );
      });
    }
    setValue("doDate", 0);

    selectedVisit?.id
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);

    dispatch(selectVisitList(""));
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    setValue("doDate", 0);
    reset();
  };

  const onChangeShare = (share: TShare) => {
    const result = shareList.find((obj) => obj.id === share.id);

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
                doDate: date
                  ? Math.floor(new Date(date).getTime() / 1000.0)
                  : share.doDate,
                createDate:
                  share.createDate && share.createDate > 0
                    ? +share.createDate
                    : share.doDate,
                incomeAmount: share.incomeAmount,
                outcomeAmount: share.outcomeAmount,
                shareId: getValues("doDate").toString(),
                visitId: "",
                category: getValues("category"),
                tag: getValues("tag"),
              }
            : shareItem
        );

      setValue(
        "shareList",
        shareArray.map((share) => share.id)
      );
      setSharelist(shareArray);
    } else {
      const newShareList = [
        ...shareList,
        {
          id: share.id || nanoid(),
          peopleId: share.peopleId,
          title: share.title || getValues("title"),
          income: share.income,
          doDate: date
            ? Math.floor(new Date(date).getTime() / 1000.0)
            : share.doDate,
          createDate:
            share.createDate && share.createDate > 0
              ? +share.createDate
              : share.doDate,
          incomeAmount: share.incomeAmount,
          outcomeAmount: share.outcomeAmount,
          shareId: getValues("doDate").toString(),
          visitId: "",
          category: getValues("category"),
          tag: getValues("tag"),
          description: share.description || getValues("description") || "",
        },
      ];

      setValue(
        "shareList",
        newShareList.map((share) => share.id)
      );
      setSharelist(newShareList);
    }
  };
  const onChangeShareSubmit = () => {
    const shareArray = shareList.map((shareItem) => ({
      id: shareItem.id,
      title: shareItem.title || getValues("title"),
      peopleId: shareItem.peopleId,
      income: shareItem.income,
      doDate: date
        ? Math.floor(new Date(date).getTime() / 1000.0)
        : getValues("doDate"),
      createDate: currentUnixTimestamp,
      incomeAmount: shareItem.incomeAmount,
      outcomeAmount: shareItem.outcomeAmount,
      shareId: getValues("doDate").toString(),
      visitId: "",
      category: getValues("category"),
      tag: getValues("tag"),
      description: shareItem.description || getValues("description") || "",
    }));

    setValue(
      "shareList",
      shareArray.map((share) => share.id)
    );
    setSharelist(shareArray);
  };

  const removeShare = (id: string) => {
    const shareArray = shareList?.filter((share) => share.id != id);

    setValue(
      "shareList",
      shareArray.map((share) => share.id)
    );
    setSharelist(shareArray);
    dispatch(delShareList(id));
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
            placeholder="Enter Visit Name"
            disabled={!!errors.title?.message}
            required
            {...field}
          />
        )}
      />

      <CalendarWithTime
        dateValue={date}
        setDate={setDate}
        message={!date && !!errors.doDate?.message}
      />

      <div className="bg-primary p-2 rounded-2xl flex flex-col gap-y-2">
        <div className="w-full flex justify-center items-center gap-x-1 bg-primary rounded-full">
          <div
            className={cn(
              "cursor-pointer w-full text-center py-1 rounded-xl px-1 hover:bg-card/15",
              !getValues("income")
                ? "bg-card/15 text-card"
                : "text-TextForeground hover:text-white"
            )}
            onClick={() => setValue("income", false)}
          >
            No Pay
          </div>
          <div
            className={cn(
              "cursor-pointer w-full text-center py-1 rounded-xl px-1 hover:bg-card/15",
              !!getValues("income")
                ? "bg-card/15 text-card"
                : "text-TextForeground "
            )}
            onClick={() => setValue("income", true)}
          >
            With Pay
          </div>
        </div>
        {watch("income") && (
          <>
            <DrawerDialogDemo
              drawerType={"ShareListDetails"}
              formType="Share List Details"
              drawerTitle="Share List Details"
              errors={errors}
              shareList={shareList || []}
              onSubmitForm={onChangeShareSubmit}
              onChangeShare={onChangeShare}
              removeShare={removeShare}
            >
              <DialogTrigger asChild>
                <Button variant="default" disabled={!date} className="w-full">
                  <div className="w-full flex flex-row justify-between px-2">
                    <span>add people</span>
                    <span>
                      {shareList && shareList.length ? shareList.length : 0}
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
      </div>
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
        {formType != "Add" && (
          <Button type="button" className="flex-1" onClick={() => onReset()}>
            reset
          </Button>
        )}
        <Button type="submit" variant="default" className="flex-1">
          submit
        </Button>
      </div>
    </form>
  );
}
