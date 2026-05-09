"use client";
import { ShoppingCart } from "@/components/icons";
import { DollarSign } from "lucide-react";
import SelectedItemContainer from "./SelectedItemContainer.component";

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
  return (
    <>
      {!income && (priceOfProduct || numberOfProduct) && (
        <div className="w-full flex flex-row justify-between gap-x-2">
          {priceOfProduct && (
            <SelectedItemContainer title="Price Of Product">
              <div className="flex flex-row items-center gap-x-0.5 text-errorRed">
                <DollarSign width={16} height={16} />
                {priceOfProduct}
              </div>
            </SelectedItemContainer>
          )}
          {numberOfProduct && (
            <SelectedItemContainer title="Number Of Product">
              <div className="flex flex-row items-center gap-x-1">
                <ShoppingCart width={16} height={16} />
                {numberOfProduct}
              </div>
            </SelectedItemContainer>
          )}
        </div>
      )}
      {income && incomeAmount && (
        <SelectedItemContainer title="Income Amount">
          <div className="flex flex-row items-center gap-x-0.5 text-successGreen">
            <DollarSign width={16} height={16} />
            {incomeAmount}
          </div>
        </SelectedItemContainer>
      )}
      {outcomeAmount && (
        <SelectedItemContainer title="Outcome Amount">
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
