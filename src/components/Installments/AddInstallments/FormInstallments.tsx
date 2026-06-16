"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { DrawerDialogDemo } from "@/components/Drawer/DrawerComponent";
import FormButtons from "@/components/FormItem/FormButton";
import TagSelectComponent from "@/components/Tags/TagSelect.component";
import { Button } from "@/components/ui/button";
import { CalendarWithTime } from "@/components/ui/calenderWithTime";
import { InputField } from "@/components/ui/inputField";
import { SelectField } from "@/components/ui/selectField";
import { TextAreaField } from "@/components/ui/textAreaField";
import { useAppDispatch } from "@/lib/hook";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import { DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { cn } from "@/lib/utils";
import {
  selectInstallmentstList,
  setInstallmentstList,
  TInstallmentst,
  updateInstallmentstList,
} from "@/modules/installmentstList/installmentst.slice";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { ManipulateType } from "dayjs";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

interface IFormInputs {
  title: string;
  description?: string;
  priority?: string;
  startDate: number;
  lastUpdate?: number;
  doDate: number;
  createDate?: number;
  completeUpdate?: number;
  paymentNumber: string;
  numberOfPayment?: string;
  paymentCompleteValue: string;
  isComplete: boolean;
  category: string;
  tag: string;
  installmentstList?: TInstallmentst[];
}
const formSchema = z.object({
  title: z.string().min(4, { message: "Name is required" }),
  description: z.string().optional(),
  installmentstList: z
    .array(
      z.object({
        doDate: z.number(),
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
  startDate: z.number().min(1, { message: "date is required" }),
  lastUpdate: z.number().optional(),
  doDate: z.number().min(1, { message: "date is required" }),
  createDate: z.number().optional(),
  completeUpdate: z.number().optional(),
  isComplete: z.boolean(),
});
export default function FormInstallments({
  onSubmitForm,
  formType,
}: {
  onSubmitForm: () => void;
  formType: string;
}) {
  const dispatch = useAppDispatch();
  const { selectedInstallmentstList } = useInstallmentsList();
  const t: any = UseLangComponent("Form");

  const [date, setDate] = useState<Date>();
  const [instalmentDetails, setInstalmentDetails] =
    useState<TInstallmentst[]>();
  // creating a schema for strings

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
      setValue("startDate", Math.floor(new Date(date).getTime() / 1000.0));
  }, [date]);

  useEffect(() => {
    const installmentArray: TInstallmentst[] = [];

    const insstallmentValue =
      +getValues("paymentCompleteValue") / +getValues("numberOfPayment");

    if (
      watch("startDate") &&
      watch("numberOfPayment") &&
      watch("paymentNumber")
    ) {
      for (let i = 1; i < +watch("numberOfPayment") + 1; i++) {
        installmentArray.push({
          doDate: DayUnixAdd(
            +watch("startDate"),
            watch("paymentNumber") as ManipulateType,
            i
          ),
          payment: insstallmentValue.toString(),
          isComplete: false,
        });
      }
      setInstalmentDetails(installmentArray);
    }
  }, [
    getValues("startDate"),
    getValues("numberOfPayment"),
    getValues("paymentNumber"),
  ]);

  useEffect(() => {
    if (formType != "Add" && selectedInstallmentstList) {
      setValue("title", selectedInstallmentstList?.title);
      setValue("description", selectedInstallmentstList?.description);
      setValue("paymentNumber", selectedInstallmentstList.paymentNumber);
      setValue("numberOfPayment", selectedInstallmentstList.numberOfPayment);
      setValue(
        "paymentCompleteValue",
        selectedInstallmentstList.paymentCompleteValue
      );
      setValue("category", selectedInstallmentstList.category);
      setValue("tag", selectedInstallmentstList.tag);
      setValue("lastUpdate", selectedInstallmentstList.lastUpdate);
      setValue("startDate", selectedInstallmentstList.startDate);
      setValue("isComplete", selectedInstallmentstList.isComplete);
      setValue(
        "installmentstList",
        selectedInstallmentstList.installmentstList
      );
      setValue("completeUpdate", selectedInstallmentstList.completeUpdate);
      setValue("doDate", selectedInstallmentstList.doDate);
      setValue(
        "createDate",
        selectedInstallmentstList.createDate ??
          +selectedInstallmentstList.doDate
      );
      setDate(new Date(Number(selectedInstallmentstList.startDate) * 1000));
      setInstalmentDetails(selectedInstallmentstList.installmentstList);
    }
  }, [selectedInstallmentstList, setValue]);

  const handlePriod = (data: string) => {
    setValue("paymentNumber", data);
  };
  const handleCategory = (data: string) => {
    setValue("category", data);
  };
  const handleTag = (data: string) => {
    setValue("tag", data);
  };

  const onSubmitHandler = () => {
    onSubmit(getValues());
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const instalmentComplete =
      instalmentDetails && instalmentDetails.filter((ins) => ins.isComplete);

    const instalmentNotComplete =
      instalmentDetails && instalmentDetails.filter((ins) => !ins.isComplete);

    const lastInstalment =
      (instalmentDetails &&
        instalmentDetails.length > 0 &&
        instalmentDetails[instalmentDetails.length - 1].doDate) ||
      selectedInstallmentstList.startDate;

    const lastComplete =
      instalmentComplete && instalmentComplete?.length > 0
        ? instalmentComplete[instalmentComplete.length - 1].doDate
        : lastInstalment;

    const firstNOtComplete =
      instalmentNotComplete && instalmentNotComplete?.length > 0
        ? instalmentNotComplete[0].doDate
        : lastInstalment;

    // const secondNOtComplete =
    //   instalmentNotComplete && instalmentNotComplete?.length > 0
    //     ? instalmentNotComplete[1].date
    //     : lastInstalment;

    const lastNOtComplete =
      instalmentNotComplete && instalmentNotComplete?.length > 0
        ? instalmentNotComplete[instalmentNotComplete.length - 1].doDate
        : lastInstalment;

    formType == "Edit"
      ? dispatch(
          updateInstallmentstList({
            id: selectedInstallmentstList.id,
            title: data.title,
            startDate: date
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.startDate,
            doDate: firstNOtComplete,
            completeUpdate: lastNOtComplete,
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
              ? Math.floor(new Date(date).getTime() / 1000.0)
              : data.startDate,
            doDate: firstNOtComplete,
            completeUpdate: lastNOtComplete,
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

    setValue("startDate", 0);

    formType == "Edit"
      ? toast(`${data.title} is updated`)
      : toast(`${data.title} is created`);

    dispatch(selectInstallmentstList(""));
    reset();
    onSubmitForm();
  };

  const onReset = () => {
    dispatch(selectInstallmentstList(""));
    setValue("startDate", 0);
    reset();
  };

  const onChangeinstallment = (install: TInstallmentst) => {
    const installmentArray =
      instalmentDetails &&
      instalmentDetails.map((installment) =>
        installment.doDate == install.doDate
          ? {
              ...installment,
              payment: install.payment,
              isComplete: install.isComplete,
            }
          : installment
      );

    setValue("installmentstList", installmentArray);
    setInstalmentDetails(installmentArray);
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
            placeholder={t.TaskName}
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

      <Controller
        defaultValue={""}
        name="numberOfPayment"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputField
            title="Number Of Payment"
            type="number"
            placeholder={t.payment}
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
            placeholder={t.PriodRepeat}
            required
            invalid={!!errors.paymentNumber?.message}
            itemArray={[
              { id: "day", title: t.day },
              { id: "week", title: t.week },
              { id: "month", title: t.month },
              { id: "year", title: t.year },
            ]}
            onValueChange={(data) => data && handlePriod(data)}
            {...field}
            value={field.value}
            className={cn(
              !field.value && errors.paymentNumber?.message
                ? "border-[1px] border-red-600"
                : ""
            )}
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
            placeholder={t.CompleteAmount}
            disabled={!!errors.paymentCompleteValue?.message}
            required
            {...field}
          />
        )}
      />

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
            placeholder={t.description}
            {...field}
          />
        )}
      />
      <DrawerDialogDemo
        drawerType="InstallmentsListDetails"
        formType="Installments List Details"
        drawerTitle={t.installmentslist}
        errors={errors}
        installment={instalmentDetails || []}
        onSubmitForm={onSubmitHandler}
        onChangeinstallment={onChangeinstallment}
      >
        <DialogTrigger asChild disabled={!date}>
          <Button variant="default" className="flex-1 w-full">
            {t.installmentslist}
          </Button>
        </DialogTrigger>
      </DrawerDialogDemo>

      {/* <div className="flex gap-4">
        {selectedInstallmentstList?.title && (
          <Button type="submit" className="flex-1" type="button" variant="secondary">
            reset
          </Button>
        )}
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
      </div> */}
      <FormButtons onReset={() => onReset()} resetOn={formType != "Add"} />
    </form>
  );
}
