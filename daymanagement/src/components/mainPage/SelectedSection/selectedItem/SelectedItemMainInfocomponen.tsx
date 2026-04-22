"use client";
import { AccountBalance, ShoppingCart } from "@/components/icons";
import SelectedItemContainer from "./SelectedItemContainer.component";
import ListPriority from "../../ListSection/ListPriority/ListPriority.component";

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
        <SelectedItemContainer
          classContainer="w-fit items-center p-3"
          title="Type"
        >
          {incomeAmount && <AccountBalance />}
          {priceOfProduct && <ShoppingCart />}
        </SelectedItemContainer>
      )}
      {title && (
        <SelectedItemContainer
          className="flex-1"
          title="Title"
          description={title}
        />
      )}
    </div>
  );
};

export default SelectedItemMainInfocomponen;
