"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  delShareList,
  setShareList,
  TShare,
  updateShareList,
} from "@/modules/share/share.slice";
import {
  selectSpendsList,
  setSpendsList,
  updateSpendsList,
} from "@/modules/spends/spends.slice";
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
  date: string;
  incomeAmount?: string;
  numberOfProduct?: string;
  priceOfProduct?: string;
  shareList?: TShare[];
  category: string;
  tag: string;
}

export default function FormSpends({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const [date, setDate] = useState<Date>();
  const [spendsIdSelected, setSpendsIdSelected] = useState<string>();

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    income: z.boolean().optional(),
    numberOfProduct: z.string().optional(),
    priceOfProduct: z.string().optional(),
    incomeAmount: z.string().optional(),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    date: z.string().min(1, { message: "date is required" }),
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
  const { selectedSpends }: any =
    useAppSelector((state) => state.SpendsList) || {};

  const {
    ListShare: ListShareAll,
  }: {
    ListShare: TShare[];
  } = useAppSelector((state) => state.ShareList) || [];

  const [shareList, setSharelist] = useState<TShare[]>([]);
  useEffect(() => {
    if (selectedSpends) {
      setValue("title", selectedSpends?.title);
      setValue("income", selectedSpends.income);
      setValue("numberOfProduct", selectedSpends.numberOfProduct);
      setValue("priceOfProduct", selectedSpends.priceOfProduct);
      setValue("incomeAmount", selectedSpends.incomeAmount);
      setValue("category", selectedSpends.category);
      setValue("tag", selectedSpends.tag);
      setValue("date", selectedSpends.date);
      setDate(new Date(Number(selectedSpends.date) * 1000));
      setSharelist(selectedSpends.shareList);
      setSpendsIdSelected(selectedSpends.id);
    }
  }, [selectedSpends, setValue]);

  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  useEffect(() => {
    console.log(errors);
    console.log(getValues());
  }, [getValues(), errors]);

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
    console.log(selectedSpends);
    const spendsId = spendsIdSelected ? spendsIdSelected : nanoid();
    console.log(spendsId);

    selectedSpends?.title
      ? dispatch(
          updateSpendsList({
            id: spendsId,
            title: data.title,
            income: data.income || false,
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            numberOfProduct: data.numberOfProduct || "",
            priceOfProduct: data.priceOfProduct || "",
            incomeAmount: data.incomeAmount || "",
            shareList: shareList || [],
            category: data.category,
            tag: data.tag,
          })
        )
      : dispatch(
          setSpendsList({
            id: spendsId,
            title: data.title,
            income: data.income || false,
            date: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.date,
            numberOfProduct: data.numberOfProduct || "",
            shareList: shareList || [],
            priceOfProduct: data.priceOfProduct || "",
            incomeAmount: data.incomeAmount || "",
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
                spendsId: spendsId,
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
                spendsId: spendsId,
                category: share.category,
                tag: share.tag,
              })
            );
      });
    }
    dispatch(selectSpendsList(""));
    toast("Wow so easy!");
    setValue("date", "");
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectSpendsList(""));
    setValue("date", "");
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
                date: date
                  ? Math.floor(new Date(date).getTime() / 1000.0).toString()
                  : share.date,
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
          date: getValues("date")
            ? Math.floor(new Date().getTime() / 1000.0).toString()
            : getValues("date"),
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
                    {!field.value ? "Buy" : "Recive"}
                  </label>
                  <BasicSwitch
                    checked={!!field.value}
                    handleToggle={() => setValue("income", !field.value)}
                    label=""
                    key={"income"}
                  />
                </div>
              )}
            />
            {!watch("income") && (
              <>
                <Controller
                  defaultValue={""}
                  name="numberOfProduct"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      title="NumberOfProduct"
                      type="number"
                      placeholder="Number Of Product"
                      disabled={!!errors.numberOfProduct?.message}
                      content={errors.numberOfProduct?.message}
                      required
                      {...field}
                    />
                  )}
                />

                <Controller
                  defaultValue={""}
                  name="priceOfProduct"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <InputField
                      title="PriceOfProduct"
                      type="number"
                      placeholder="Price Of Product"
                      disabled={!!errors.priceOfProduct?.message}
                      content={errors.priceOfProduct?.message}
                      required
                      {...field}
                    />
                  )}
                />
              </>
            )}

            {watch("income") && (
              <Controller
                defaultValue={""}
                name="incomeAmount"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    title="IncomeAmount"
                    type="number"
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
                <Button variant="default" disabled={!date}>
                  <div className="w-full flex flex-row justify-between">
                    <span>add people</span>
                    <span>
                      {shareList && shareList.length ? shareList.length : 0}
                    </span>
                  </div>
                </Button>
              </DialogTrigger>
            </DrawerDialogDemo>
          </div>
        </div>

        {!selectedSpends?.title && (
          <Button type="submit" variant="default">
            submit
          </Button>
        )}

        {selectedSpends?.title && (
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
  );
}
