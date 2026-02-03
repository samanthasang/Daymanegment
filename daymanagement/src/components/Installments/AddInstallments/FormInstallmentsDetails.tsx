"use client";
import BasicSwitch from "@/components/ui/BasicSwitch";
import { Input } from "@/components/ui/input";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import dayjs from "dayjs";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldErrors } from "react-hook-form";

export default function FormInstallmentsDetails({
  installment,
  errors,
  onChangeinstallment,
}: {
  installment: TInstallmentst;

  onChangeinstallment: (install: TInstallmentst) => void;
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

  useEffect(() => {
    onChangeinstallment(instalmentDetail);
  }, [instalmentDetail]);

  return (
    <div className=" flex flex-row justify-center items-centerw-full min-w-60 gap-y-4 border px-3 py-2 rounded-2xl border-white">
      <label className="px-2 py-1 flex-none">
        {dayjs(dayjs.unix(Number(installment.date))).format("YYYY-MM-DD")}
      </label>
      <Input
        className="!text-white w-full px-3 border-white rounded py-1 flex-1"
        placeholder="Name"
        value={instalmentDetail.payment}
        onChange={(e) => onChageInput(e)}
      />
      {errors.title?.message && (
        <p className="text-xs text-red-500">{errors.title?.message}</p>
      )}

      <div className="flex-none w-14 flex flex-row justify-center items-center">
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
      </div>
    </div>
  );
}
