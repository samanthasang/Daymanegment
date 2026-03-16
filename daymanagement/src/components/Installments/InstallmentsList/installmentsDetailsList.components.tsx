"use client";
import { Button } from "@/components/ui/button";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { FieldErrors } from "react-hook-form";
import FormInstallmentsDetails from "../AddInstallments/FormInstallmentsDetails";

export default function FormInstallmentsDetailsList({
  onSubmitForm,
  installment,
  errors,
  onChangeinstallment,
}: {
  onSubmitForm: () => void;
  installment?: TInstallmentst[];
  onChangeinstallment: (install: TInstallmentst) => void;
  errors?: FieldErrors<{
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
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-y-2 w-full h-96 overflow-y-scroll">
        {installment &&
          errors &&
          installment.map((i) => (
            <FormInstallmentsDetails
              key={i.date}
              errors={errors}
              installment={i}
              onChangeinstallment={onChangeinstallment}
            />
          ))}
      </div>
      <Button
        onClick={() => onSubmitForm()}
      >
        submit
      </Button>
    </div>
  );
}
