"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import { Edit } from "@/components/table";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { cn } from "@/lib/utils";
import {
  selectInstallmentstList,
  setInstallmentstList,
  TInstallmentst,
  updateInstallmentstList,
} from "@/modules/installmentstList/installmentst.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import dayjs, { ManipulateType } from "dayjs";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import FormInstallmentsDetails from "./FormInstallmentsDetails";

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
  } = methods;

  useEffect(() => {
    date &&
      setValue(
        "startDate",
        Math.floor(new Date(date).getTime() / 1000.0).toString()
      );
  }, [date]);

  useEffect(() => {
    const installmentArray: TInstallmentst[] = [];

    if (
      watch("startDate") &&
      watch("numberOfPayment") &&
      watch("paymentNumber")
    ) {
      for (let i = 1; i < +watch("numberOfPayment") + 1; i++) {
        installmentArray.push({
          date: dayjs(
            dayjs
              .unix(+watch("startDate"))
              .add(
                +watch("numberOfPayment") * i,
                watch("paymentNumber") as ManipulateType
              )
          )
            .unix()
            .toString(),
          payment: (
            +watch("paymentCompleteValue") / +watch("numberOfPayment")
          ).toString(),
          isComplete: false,
        });
      }
      setInstalmentDetails(installmentArray);
    }
    console.log(installmentArray);
    console.log(watch("startDate"));
    console.log(watch("numberOfPayment"));
    console.log(watch("paymentNumber"));
    console.log(watch("paymentCompleteValue"));
  }, [watch("startDate")]);

  const dispatch = useAppDispatch();
  const { selectedInstallmentst }: any =
    useAppSelector((state) => state.InstallmentstList) || {};

  useEffect(() => {
    if (selectedInstallmentst) {
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
      setValue("completeUpdate", selectedInstallmentst.completeUpdate);
      setDate(new Date(Number(selectedInstallmentst.startDate) * 1000));
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
    onSubmit(getValues())
  }

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);

    selectedInstallmentst?.title
      ? dispatch(
          updateInstallmentstList({
            id: selectedInstallmentst.id,
            title: data.title,
            startDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0).toString()
              : data.startDate,
            lastUpdate: "string",
            completeUpdate: "string",
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
                ? Math.floor(new Date(date).getTime() / 1000.0).toString()
                : data.startDate,
            completeUpdate: instalmentDetails
              ? instalmentDetails[0].date
              : date
                ? Math.floor(new Date(date).getTime() / 1000.0).toString()
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
                defaultValue={""}
                name="numberOfPayment"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input
                    className="!text-white w-full px-3 border-white rounded py-1"
                    placeholder="Number Of Payment"
                    type="tel"
                    {...field}
                  />
                )}
              />
              {errors.numberOfPayment?.message && (
                <p className="text-xs text-red-500">
                  {errors.numberOfPayment?.message}
                </p>
              )}

              <Controller
                defaultValue={""}
                name="paymentNumber"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    onValueChange={(data) => data && handlePriod(data)}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full border-white rounded py-1">
                      <SelectValue placeholder="Priod for repeat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={"day"}>Day</SelectItem>
                      <SelectItem value={"week"}>Week</SelectItem>
                      <SelectItem value={"month"}>Mounth</SelectItem>
                      <SelectItem value={"year"}>Year</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.paymentNumber?.message && (
                <p className="text-xs text-red-500">
                  {errors.paymentNumber?.message}
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
                    placeholder="Payment Complete Amount"
                    type="tel"
                    {...field}
                  />
                )}
              />
              {errors.paymentCompleteValue?.message && (
                <p className="text-xs text-red-500">
                  {errors.paymentCompleteValue?.message}
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
                name="startDate"
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
              {errors.startDate?.message && (
                <p className="text-xs text-red-500">
                  {errors.startDate?.message}
                </p>
              )}
            </div>
          </div>

          {!selectedInstallmentst?.title && (
            <DrawerDialogDemo
              drawerType={"InstallmentsListDetails"}
              formType="Installments List Details"
              errors={errors}
              installment={instalmentDetails || []}
              onSubmitForm={onSubmitHandler}
              onChangeinstallment={onChangeinstallment}
            >
              <DialogTrigger asChild>
                <Button className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">
                  submit
                </Button>
              </DialogTrigger>
            </DrawerDialogDemo>
          )}

          {selectedInstallmentst?.title && (
            <div className="flex gap-4">
              <Button
                onClick={() => onReset()}
                type="button"
                className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
              >
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
                  <Button className="cursor-pointer w-full text-white bg-background border border-white rounded py-1">
                    submit
                  </Button>
                </DialogTrigger>
              </DrawerDialogDemo>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
