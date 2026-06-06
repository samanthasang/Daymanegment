"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
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
  doDate: number;
  createDate?: number;
  incomeAmount?: string;
  numberOfProduct?: string;
  priceOfProduct?: string;
  shareList?: string[];
  category: string;
  tag: string;
  description?: string;
}

export default function FormSpends({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { selectedSpends } = useSpendsList();

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
    doDate: z.number().min(1, { message: "date is required" }),
    createDate: z.number().optional(),
    description: z.string().optional(),
    shareList: z.array(z.string()).optional(),
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
    selectedSpends &&
    selectedSpends.shareList &&
    ListShareAll &&
    ListShareAll.filter((share) => selectedSpends.shareList.includes(share.id));

  const [shareList, setSharelist] = useState<TShare[]>([]);
  useEffect(() => {
    if (formType != "Add" && selectedSpends) {
      setValue("title", selectedSpends?.title);
      setValue("income", selectedSpends.income);
      setValue("numberOfProduct", selectedSpends.numberOfProduct);
      setValue("priceOfProduct", selectedSpends.priceOfProduct);
      setValue("incomeAmount", selectedSpends.incomeAmount);
      setValue("category", selectedSpends.category);
      setValue("tag", selectedSpends.tag);
      setValue("doDate", selectedSpends.doDate);
      setValue(
        "createDate",
        +selectedSpends.createDate || +selectedSpends.doDate
      );
      setDate(new Date(Number(selectedSpends.doDate) * 1000));
      setSharelist(result || []);
      setValue("shareList", selectedSpends.shareList);
      setSpendsIdSelected(selectedSpends.id);
      setValue("description", selectedSpends?.description);
    }
  }, [selectedSpends, setValue]);

  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const spendsId = spendsIdSelected ? spendsIdSelected : nanoid();

    formType == "Edit"
      ? dispatch(
          updateSpendsList({
            id: spendsId,
            title: data.title,
            income: data.income || false,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            createDate:
              data.createDate && data.createDate > 0
                ? data.createDate
                : data.doDate,
            numberOfProduct: data.numberOfProduct || "",
            priceOfProduct: data.priceOfProduct || "",
            incomeAmount: data.incomeAmount || "",
            shareList: shareList.map((share) => share.id) || [],
            category: data.category,
            tag: data.tag,
            description: data.description || "",
          })
        )
      : dispatch(
          setSpendsList({
            id: spendsId,
            title: data.title,
            income: data.income || false,
            doDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.doDate,
            createDate: currentUnixTimestamp,
            numberOfProduct: data.numberOfProduct || "",
            shareList: shareList.map((share) => share.id) || [],
            priceOfProduct: data.priceOfProduct || "",
            incomeAmount: data.incomeAmount || "",
            category: data.category,
            tag: data.tag,
            description: data.description || "",
          })
        );
    if (shareList.length > 0) {
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
                spendsId: spendsId,
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
                spendsId: spendsId,
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

    selectedSpends?.id
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);

    dispatch(selectSpendsList(""));
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectSpendsList(""));
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
                title: share.title || getValues("title"),
                peopleId: share.peopleId,
                income: share.income,
                doDate: date
                  ? Math.floor(new Date(date).getTime() / 1000.0)
                  : share.doDate,
                createDate:
                  share.createDate && share.createDate > 0
                    ? share.createDate
                    : share.doDate,
                incomeAmount: share.incomeAmount,
                outcomeAmount: share.outcomeAmount,
                shareId: getValues("doDate").toString(),
                visitId: "",
                category: getValues("category"),
                tag: getValues("tag"),
                description:
                  share.description || getValues("description") || "",
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
          title: share.title || getValues("title"),
          peopleId: share.peopleId,
          income: share.income,
          doDate: date
            ? Math.floor(new Date(date).getTime() / 1000.0)
            : share.doDate,
          createDate:
            share.createDate && share.createDate > 0
              ? share.createDate
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
            placeholder="Enter Task Name"
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
        <div className="w-full flex justify-center items-center gap-x-2 bg-primary rounded-full">
          <div
            className={cn(
              "cursor-pointer w-full text-center py-1 rounded-2xl hover:bg-card/15",
              !getValues("income")
                ? "bg-card/15 text-card"
                : "text-TextForeground"
            )}
            onClick={() => setValue("income", false)}
          >
            Buy
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
            Recive
          </div>
        </div>

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

      <DrawerDialogDemo
        drawerType={"ShareListDetails"}
        formType="Share List Details"
        drawerTitle="Share List"
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

      <div className="flex gap-4">
        {formType.split(" ")[0] && (
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
