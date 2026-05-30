"use client";
import { ShoppingCart } from "@/components/icons";
import { DollarSign } from "lucide-react";
import SelectedItemContainer from "./SelectedItemContainer.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

export const SelectedItemSpends = ({
  income,
  incomeAmount,
  outcomeAmount,
  numberOfProduct,
  priceOfProduct,
}: {
  income: boolean;
  incomeAmount?: string;
  outcomeAmount?: string;
  numberOfProduct?: string;
  priceOfProduct?: string;
}) => {
  const t: any = UseLangComponent("Selected");
  return (
    <>
      {!income && (priceOfProduct || numberOfProduct) && (
        <div className="w-full flex flex-row justify-between gap-x-2">
          {!!priceOfProduct && (
            <SelectedItemContainer title={t.PriceProduct}>
              <div className="flex flex-row items-center gap-x-0.5 text-errorRed">
                <DollarSign width={16} height={16} />
                {priceOfProduct}
              </div>
            </SelectedItemContainer>
          )}
          {!!numberOfProduct && (
            <SelectedItemContainer title={t.NumberProduct}>
              <div className="flex flex-row items-center gap-x-1">
                <ShoppingCart width={16} height={16} />
                {numberOfProduct}
              </div>
            </SelectedItemContainer>
          )}
        </div>
      )}
      {!!incomeAmount && (
        <SelectedItemContainer title={t.IncomeAmount}>
          <div className="flex flex-row items-center gap-x-0.5 text-successGreen">
            <DollarSign width={16} height={16} />
            {incomeAmount}
          </div>
        </SelectedItemContainer>
      )}
      {!!outcomeAmount && (
        <SelectedItemContainer title={t.OutcomeAmount}>
          <label>
            <div className="flex flex-row items-center gap-x-0.5 text-errorRed">
              <DollarSign width={16} height={16} />
              {outcomeAmount}
            </div>
          </label>
        </SelectedItemContainer>
      )}
    </>
  );
};

export default SelectedItemSpends;
