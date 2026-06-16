"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import dayjs from "dayjs";
import { CheckCircle } from "lucide-react";
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
      doDate: number;
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
  const t: any = UseLangComponent("Form");
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
    <div className=" flex flex-row justify-between items-center w-full min-w-60 gap-y-4 bg-primary p-2 rounded-2xl">
      <label className="px-2 py-1 flex-none">
        {dayjs(dayjs.unix(Number(installment.doDate))).format("YYYY-MM-DD")}
      </label>
      <Input
        className="!text-white w-full px-3 rounded-2xl py-1 flex-1"
        placeholder={t.paymentAmount}
        value={instalmentDetail.payment}
        onChange={(e) => onChageInput(e)}
      />

      <div className="flex-none w-14 flex flex-row justify-center items-center">
        <Button
          disabled={installment.isComplete}
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            installment.doDate &&
              setInstalmentDetail({
                ...installment,
                isComplete: !installment.isComplete,
              });
          }}
          className={installment.isComplete ? "bg-success" : "bg-primary"}
        >
          <CheckCircle width={16} height={16} />
        </Button>
      </div>
    </div>
  );
}
