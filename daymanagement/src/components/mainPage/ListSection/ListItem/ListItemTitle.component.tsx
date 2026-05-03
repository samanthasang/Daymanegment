import { AccountBalance, ShoppingCart } from "@/components/icons";
import ListPriority from "../ListPriority/ListPriority.component";
import { DollarSign, ShoppingBag } from "lucide-react";

export const ListItemTitle = ({
  priority,
  title,
  incomeAmount,
  priceOfProduct,
}: {
  priority?: string;
  title: string;
  incomeAmount?: string;
  priceOfProduct?: string;
}) => {
  return (
    <div className="flex col-span-4 justify-start items-start">
      <label className="h-8 flex justify-center items-center cursor-pointer gap-x-1">
        {priority && <ListPriority priority={priority} />}
        {incomeAmount && <DollarSign width={16} height={16} />}
        {priceOfProduct && <ShoppingBag width={16} height={16} />}
        {title || ""}
      </label>
    </div>
  );
};

export default ListItemTitle;
