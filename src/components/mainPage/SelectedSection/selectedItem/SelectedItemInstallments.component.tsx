"use client";
import { CalendarSync, FilePlus } from "lucide-react";
import SelectedItemContainer from "./SelectedItemContainer.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

export const SelectedItemInstallments = ({
  paymentNumber,
  numberOfPayment,
}: {
  paymentNumber?: string;
  numberOfPayment?: string;
}) => {
  const t: any = UseLangComponent("Selected");
  return (
    (numberOfPayment || paymentNumber) && (
      <div className="w-full flex flex-row justify-between gap-x-2">
        {numberOfPayment && (
          <SelectedItemContainer title={t.Installments}>
            <div className="flex flex-row items-center gap-x-1">
              <FilePlus width={16} height={16} />
              {numberOfPayment}
            </div>
          </SelectedItemContainer>
        )}
        {paymentNumber && (
          <SelectedItemContainer title={t.Period}>
            <div className="flex flex-row items-center gap-x-1">
              <CalendarSync width={16} height={16} />
              {paymentNumber}
            </div>
          </SelectedItemContainer>
        )}
      </div>
    )
  );
};

export default SelectedItemInstallments;
