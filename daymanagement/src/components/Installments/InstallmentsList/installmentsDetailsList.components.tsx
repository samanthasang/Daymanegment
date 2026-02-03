"use client";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import { FieldErrors, SubmitHandler } from "react-hook-form";
import FormInstallmentsDetails from "../AddInstallments/FormInstallmentsDetails";
import { Button } from "@/components/ui/button";

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
      <Button
        // type="submit"
        onClick={() => onSubmitForm()}
        className="cursor-pointer w-full text-white bg-background border border-white rounded py-1"
      >
        submit
      </Button>
    </div>
  );
}
