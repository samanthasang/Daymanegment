"use client";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";
import SelectedItemContainer from "./SelectedItemContainer.component";
import { TInstallmentst } from "@/modules/installmentstList/installmentst.slice";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

export const SelectedItemVisit = ({
  advancePayment,
  paymentCompleteValue,
  installmentstList,
}: {
  advancePayment?: string;
  paymentCompleteValue?: string;
  installmentstList?: TInstallmentst[];
}) => {
  const t: any = UseLangComponent("Selected");
  const incomeArray =
    installmentstList &&
    installmentstList.reduce((acc, obj) => {
      if (obj.isComplete) {
        return acc + +obj.payment;
      }
      return acc;
    }, 0);
  const outComeArray =
    installmentstList &&
    installmentstList.reduce((acc, obj) => {
      if (!obj.isComplete) {
        return acc + +obj.payment;
      }
      return acc;
    }, 0);
  return (
    (paymentCompleteValue || advancePayment) && (
      <>
        <div className="w-full flex flex-row justify-between gap-x-2">
          {paymentCompleteValue && (
            <SelectedItemContainer title={t.CompletePayment}>
              <div
                className={cn(
                  "flex flex-row items-center gap-x-0.5",

                  "text-successGreen"
                )}
              >
                <DollarSign width={16} height={16} />
                {paymentCompleteValue}
              </div>
            </SelectedItemContainer>
          )}
          {paymentCompleteValue && advancePayment && (
            <SelectedItemContainer title={t.AdvancePayment}>
              <div
                className={cn(
                  "flex flex-row items-center gap-x-0.5",
                  "text-errorRed"
                )}
              >
                <DollarSign width={16} height={16} />
                {advancePayment}
              </div>
            </SelectedItemContainer>
          )}
        </div>
        {installmentstList && (
          <div className="w-full flex flex-row justify-between gap-x-2">
            <SelectedItemContainer title={t.AdvancedPayment}>
              <div
                className={cn(
                  "flex flex-row items-center gap-x-0.5",

                  "text-successGreen"
                )}
              >
                <DollarSign width={16} height={16} />
                {incomeArray}
              </div>
            </SelectedItemContainer>

            <SelectedItemContainer title={t.LeftoverPayment}>
              <div
                className={cn(
                  "flex flex-row items-center gap-x-0.5",
                  "text-errorRed"
                )}
              >
                <DollarSign width={16} height={16} />
                {outComeArray}
              </div>
            </SelectedItemContainer>
          </div>
        )}
        {paymentCompleteValue &&
          advancePayment &&
          +advancePayment - +paymentCompleteValue != 0 && (
            <SelectedItemContainer title={t.TotalPayment}>
              <div
                className={cn(
                  "flex flex-row items-center gap-x-0.5",
                  +paymentCompleteValue - +advancePayment > 0
                    ? "text-errorRed"
                    : "text-successGreen"
                )}
              >
                <DollarSign width={16} height={16} />
                {+advancePayment - +paymentCompleteValue}
              </div>
            </SelectedItemContainer>
          )}
      </>
    )
  );
};

export default SelectedItemVisit;
