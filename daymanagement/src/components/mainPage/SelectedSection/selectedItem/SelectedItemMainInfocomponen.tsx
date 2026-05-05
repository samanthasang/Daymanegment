"use client";
import SelectedItemContainer from "./SelectedItemContainer.component";
import ListPriority from "../../ListSection/ListPriority/ListPriority.component";
import { CircleDollarSign, ShoppingCart } from "lucide-react";

export const SelectedItemMainInfocomponen = ({
  priority,
  title,
  incomeAmount,
  priceOfProduct,
}: {
  priority?: string;
  title: string;
  incomeAmount?: string;
  numberOfProduct?: string;
  priceOfProduct?: string;
}) => {
  return (
    <div className="w-full flex flex-row justify-between gap-x-3">
      {priority && (
        <SelectedItemContainer
          classContainer="w-fit items-center p-3"
          title="Priority"
        >
          <ListPriority priority={priority} showTitle />
        </SelectedItemContainer>
      )}
      {(incomeAmount || priceOfProduct) && (
        <SelectedItemContainer classContainer="w-fit items-center" title="Type">
          {incomeAmount && (
            <div className="flex items-center gap-x-1">
              <CircleDollarSign
                width={16}
                height={16}
                className="text-successGreen"
              />
              <label>Earn</label>
            </div>
          )}
          {priceOfProduct && (
            <div className="flex items-center gap-x-1">
              <ShoppingCart width={16} height={16} className="text-errorRed" />
              <label>Buy</label>
            </div>
          )}
        </SelectedItemContainer>
      )}

      <SelectedItemContainer
        className="flex-1"
        title="Title"
        description={title}
      />
    </div>
  );
};

export default SelectedItemMainInfocomponen;
