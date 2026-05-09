"use client";
import { CalendarSync, FilePlus } from "lucide-react";
import SelectedItemContainer from "./SelectedItemContainer.component";

export const SelectedItemInstallments = ({
  paymentNumber,
  numberOfPayment,
}: {
  paymentNumber?: string;
  numberOfPayment?: string;
}) => {
  return (
    (numberOfPayment || paymentNumber) && (
      <div className="w-full flex flex-row justify-between gap-x-2">
        {numberOfPayment && (
          <SelectedItemContainer title="Installments">
            <div className="flex flex-row items-center gap-x-1">
              <FilePlus width={16} height={16} />
              {numberOfPayment}
            </div>
          </SelectedItemContainer>
        )}
        {paymentNumber && (
          <SelectedItemContainer title="Period">
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
