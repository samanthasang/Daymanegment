"use client";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import {
  FieldErrors,
  SubmitHandler
} from "react-hook-form";

export default function FormInstallmentsDetails({
  onSubmitForm,
  installment,
  errors,
}: {
  onSubmitForm: SubmitHandler<any>;
  installment: TInstallmentst;
  errors: FieldErrors<{
    title: string;
    description: string;
    installmentstList: {
      isComplete: boolean;
      date: string;
      payment: string;
    }[];
    priority: string;
    paymentNumber: string;
    numberOfPayment: string;
    paymentCompleteValue: string;
    category: string;
    tag: string;
    startDate: string;
    lastUpdate: string;
    completeUpdate: string;
  }>;
}) {
  const [instalmentDetail, setInstalmentDetail] =
    useState<TInstallmentst>(installment);

  const onChageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInstalmentDetail({
      ...installment,
      payment: e.target.value,
    });
  };
  return (
    <div className="w-1/2 min-w-60 flex flex-row gap-y-4">
      <label className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}>
        {dayjs(dayjs.unix(Number(installment.date))).format("YYYY-MM-DD")}
      </label>
      <Input
        className="!text-white w-full px-3 border-white rounded py-1"
        placeholder="Name"
        value={instalmentDetail.payment}
        onChange={(e) => onChageInput(e)}
      />
      {errors.title?.message && (
        <p className="text-xs text-red-500">{errors.title?.message}</p>
      )}

      <BasicSwitch
        checked={installment.isComplete}
        handleToggle={(e) => {
          e && e.preventDefault();
          installment.date &&
            setInstalmentDetail({
              ...installment,
              isComplete: !installment.isComplete,
            });
        }}
        label=""
        key={"isComplete"}
      />
      <Button
        type="submit"
        className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
      >
        submit
      </Button>
    </div>
  );
}
