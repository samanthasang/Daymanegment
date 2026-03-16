"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarDialog } from "@/components/ui/calenderWithDialog";
import { ClendarButtonGroup } from "@/components/ui/ClendarButtonGroup";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectInstallmentstList,
  setInstallmentstList,
  TInstallmentst,
  updateInstallmentstList,
} from "@/modules/installmentstList/installmentst.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import dayjs, { ManipulateType } from "dayjs";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface IFormInputs {
  title: string;
  startDate: string;
  description?: string;
  priority?: string;
  lastUpdate?: string;
  completeUpdate?: string;
  paymentNumber: string;
  numberOfPayment?: string;
  paymentCompleteValue: string;
  category: string;
  tag: string;
  installmentstList?: TInstallmentst[];
}

export default function FormInstallments({
  onSubmitForm,
}: {
  onSubmitForm: () => void;
}) {
  const [date, setDate] = useState<Date>();
  const [instalmentDetails, setInstalmentDetails] =
    useState<TInstallmentst[]>();
  console.log(date);

  // creating a schema for strings
  const formSchema = z.object({
    title: z.string().min(4, { message: "Name is required" }),
    description: z.string().optional(),
    installmentstList: z
      .array(
        z.object({
          date: z.string(),
          payment: z.string(),
          isComplete: z.boolean(),
        })
      )
      .optional(),
    priority: z.string().optional(),
    paymentNumber: z.string().min(1, { message: "Payment Number is required" }),
    numberOfPayment: z
      .string()
      .min(1, { message: "Number Of Payment is required" }),
    paymentCompleteValue: z
      .string()
      .min(1, { message: "Payment Complete Value is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    tag: z.string().min(1, { message: "Tag is required" }),
    startDate: z.string().min(1, { message: "date is required" }),
    lastUpdate: z.string().optional(),
    completeUpdate: z.string().optional(),
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
    register,
  } = methods;

  useEffect(() => {
    date &&
      setValue(
        "startDate",
        Math.floor(new Date(date).getTime() / 1000.0).toString()
      );
  }, [date]);

  const fillINstallmentsArray = () => {
    const installmentArray: TInstallmentst[] = [];

    const insstallmentValue =
      +getValues("paymentCompleteValue") / +getValues("numberOfPayment");
    console.log(watch("paymentNumber") as ManipulateType);
    console.log(getValues("paymentCompleteValue"));
    console.log(getValues("numberOfPayment"));
    console.log(
      +getValues("paymentCompleteValue") / +getValues("numberOfPayment")
    );
    if (
      watch("startDate") &&
      watch("numberOfPayment") &&
      watch("paymentNumber") &&
      !instalmentDetails
    ) {
      for (let i = 1; i < +watch("numberOfPayment") + 1; i++) {
        installmentArray.push({
          date: dayjs(
            dayjs
              .unix(+watch("startDate"))
              .add(i, watch("paymentNumber") as ManipulateType)
          )
            .unix()
            .toString(),
          payment: insstallmentValue.toString(),
          isComplete: false,
        });
      }
      setInstalmentDetails(installmentArray);
    }
  };

  const dispatch = useAppDispatch();
  const { selectedInstallmentst }: any =
    useAppSelector((state) => state.InstallmentstList) || {};

  useEffect(() => {
    if (selectedInstallmentst) {
      console.log(selectedInstallmentst);

      setValue("title", selectedInstallmentst?.title);
      setValue("description", selectedInstallmentst?.description);
      setValue("paymentNumber", selectedInstallmentst.paymentNumber);
      setValue("numberOfPayment", selectedInstallmentst.numberOfPayment);
      setValue(
        "paymentCompleteValue",
        selectedInstallmentst.paymentCompleteValue
      );
      setValue("category", selectedInstallmentst.category);
      setValue("tag", selectedInstallmentst.tag);
      setValue("startDate", selectedInstallmentst.startDate);
      setValue("lastUpdate", selectedInstallmentst.lastUpdate);
      setValue("installmentstList", selectedInstallmentst.installmentstList);
      setValue("completeUpdate", selectedInstallmentst.completeUpdate);
      setDate(new Date(Number(selectedInstallmentst.startDate) * 1000));
      setInstalmentDetails(selectedInstallmentst.installmentstList);
    }
  }, [selectedInstallmentst, setValue]);

  const handlePriod = (data: string) => {
    setValue("paymentNumber", data);
  };
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

  const onSubmitHandler = () => {
    onSubmit(getValues());
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

    const nextDate =
      instalmentDetails &&
      instalmentDetails.find(
        (element: TInstallmentst) => element.isComplete != false
      );
    selectedInstallmentst?.title
      ? dispatch(
          updateInstallmentstList({
            id: selectedInstallmentst.id,
            title: data.title,
            startDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.title,
            lastUpdate: nextDate || selectedInstallmentst.startDate,
            completeUpdate: nextDate || selectedInstallmentst.startDate,
            description: data.description || "",
            priority: data.priority || "",
            paymentNumber: data.paymentNumber || "",
            numberOfPayment: data.numberOfPayment || "",
            paymentCompleteValue: data.paymentCompleteValue || "",
            category: data.category,
            tag: data.tag,
            installmentstList: instalmentDetails || [],
          })
        )
      : dispatch(
          setInstallmentstList({
            id: "",
            title: data.title,
            startDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.startDate,
            lastUpdate: instalmentDetails
              ? instalmentDetails[0].date
              : date
                ? Math.floor(new Date(date).getTime()).toString()
                : data.startDate,
            completeUpdate: instalmentDetails
              ? instalmentDetails[0].date
              : date
                ? Math.floor(new Date(date).getTime()).toString()
                : data.startDate,
            description: data.description || "",
            priority: data.priority || "",
            paymentNumber: data.paymentNumber || "",
            numberOfPayment: data.numberOfPayment || "",
            paymentCompleteValue: data.paymentCompleteValue || "",
            category: data.category,
            tag: data.tag,
            installmentstList: instalmentDetails || [],
          })
        );
    dispatch(selectInstallmentstList(""));
    setValue("startDate", "");
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectInstallmentstList(""));
    setValue("startDate", "");
    reset();
  };

  const onChangeinstallment = (install: TInstallmentst) => {
    const installmentArray =
      instalmentDetails &&
      instalmentDetails.map((installment) =>
        installment.date == install.date
          ? {
              ...installment,
              payment: install.payment,
              isComplete: install.isComplete,
            }
          : installment
      );
    console.log(install);
    console.log(installmentArray);

    setValue("installmentstList", installmentArray);
    setInstalmentDetails(installmentArray);
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
                    // className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Enter Task Name"
                    disabled={!!errors.title?.message}
                    required
                    {...field}
                  />
                )}
              />

              <ClendarButtonGroup
                dateValue={date}
                errors={!date && !!errors.startDate?.message}
                // description={errors.category?.message}
              >
                <Controller
                  name="startDate"
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
                name="numberOfPayment"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputField
                    title="Number Of Payment"
                    type="number"
                    // className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Number Of Payment"
                    disabled={!!errors.numberOfPayment?.message}
                    required
                    {...field}
                  />
                )}
              />

              <Controller
                defaultValue={""}
                name="paymentNumber"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <SelectField
                    title="paymentNumber"
                    description={errors.paymentNumber?.message}
                    placeholder="Priod for repeat"
                    required
                    invalid={!!errors.paymentNumber?.message}
                    itemArray={[
                      { id: "day", title: "Day" },
                      { id: "week", title: "Week" },
                      { id: "month", title: "Month" },
                      { id: "year", title: "Year" },
                    ]}
                    onValueChange={(data) => data && handlePriod(data)}
                    {...field}
                    value={field.value}
                    className={`${!field.value && errors.paymentNumber?.message ? "border-[1px] border-red-600" : ""}`}
                    {...register("paymentNumber")}
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
                    title="PaymentCompleteValue"
                    type="number"
                    // className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Payment Complete Amount"
                    disabled={!!errors.paymentCompleteValue?.message}
                    required
                    {...field}
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

          <DrawerDialogDemo
            drawerType={"InstallmentsListDetails"}
            formType="Installments List Details"
            errors={errors}
            installment={instalmentDetails || []}
            onSubmitForm={onSubmitHandler}
            onChangeinstallment={onChangeinstallment}
          >
            <DialogTrigger asChild disabled={!date}>
              <Button onClick={() => fillINstallmentsArray()} variant="default">
                installments list
              </Button>
            </DialogTrigger>
          </DrawerDialogDemo>

          {!selectedInstallmentst?.title && (
            <Button
              type="submit"
              disabled={!instalmentDetails}
              variant="default"
            >
              submit
            </Button>
          )}

          {selectedInstallmentst?.title && (
            <div className="flex gap-4">
              <Button onClick={() => onReset()} type="button" variant="default">
                reset
              </Button>

              <DrawerDialogDemo
                drawerType={"InstallmentsListDetails"}
                formType="Installments List Details"
                errors={errors}
                installment={instalmentDetails || []}
                onSubmitForm={onSubmitHandler}
                onChangeinstallment={onChangeinstallment}
              >
                <DialogTrigger asChild>
                  <Button variant="default">submit</Button>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
