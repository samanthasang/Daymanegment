"use client";
import { CircleDollarSign, CircleOff, ShoppingCart } from "lucide-react";
import ListPriority from "../../ListSection/ListPriority/ListPriority.component";
import SelectedItemContainer from "./SelectedItemContainer.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

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
  const t: any = UseLangComponent("Selected");
  return (
    <div className="w-full flex flex-row justify-between gap-x-2">
      {priority && (
        <SelectedItemContainer
          classContainer="w-fit items-center p-2"
          title={t.Priority}
        >
          <ListPriority priority={priority} showTitle />
        </SelectedItemContainer>
      )}
      {(incomeAmount || priceOfProduct || isFinish) && (
        <SelectedItemContainer
          classContainer="w-fit items-center"
          title={isFinish ? t.Status : t.Type}
        >
          {incomeAmount && (
            <div className="flex items-center gap-x-1">
              <CircleDollarSign
                width={16}
                height={16}
                className="text-successGreen"
              />
              <label>{t.Earn}</label>
            </div>
          )}
          {priceOfProduct && (
            <div className="flex items-center gap-x-1">
              <ShoppingCart width={16} height={16} className="text-errorRed" />
              <label>{t.Buy}</label>
            </div>
          )}
          {isFinish && (
            <div className="flex items-center gap-x-1 text-successGreen">
              <CircleOff width={16} height={16} />
              <label>{t.Finished}</label>
            </div>
          )}
        </SelectedItemContainer>
      )}

      <SelectedItemContainer
        className="flex-1"
        title={t.Title}
        description={title}
      />
    </div>
  );
};

export default SelectedItemMainInfocomponen;
