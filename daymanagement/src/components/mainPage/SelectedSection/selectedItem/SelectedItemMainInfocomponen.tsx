"use client";
import {
  CircleDollarSign,
  CircleOff,
  PauseCircle,
  ShoppingCart,
} from "lucide-react";
import ListPriority from "../../ListSection/ListPriority/ListPriority.component";
import SelectedItemContainer from "./SelectedItemContainer.component";

export const SelectedItemMainInfocomponen = ({
  priority,
  title,
  incomeAmount,
  priceOfProduct,
  isFinish,
}: {
  priority?: string;
  title: string;
  incomeAmount?: string;
  numberOfProduct?: string;
  priceOfProduct?: string;
  isFinish?: boolean;
}) => {
  return (
    <div className="w-full flex flex-row justify-between gap-x-2">
      {priority && (
        <SelectedItemContainer
          classContainer="w-fit items-center p-2"
          title="Priority"
        >
          <ListPriority priority={priority} showTitle />
        </SelectedItemContainer>
      )}
      {(incomeAmount || priceOfProduct || isFinish) && (
        <SelectedItemContainer
          classContainer="w-fit items-center"
          title={isFinish ? "Status" : "Type"}
        >
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
          {isFinish && (
            <div className="flex items-center gap-x-1 text-successGreen">
              <CircleOff width={16} height={16} />
              <label>Finished</label>
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
