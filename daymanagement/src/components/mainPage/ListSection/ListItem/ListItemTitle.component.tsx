import { AccountBalance, ShoppingCart } from "@/components/icons";
import ListPriority from "../ListPriority/ListPriority.component";

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
    <div className="select-none cursor-pointer flex col-span-4 gap-3 justify-start items-start">
      <label className="h-8 flex justify-center items-center gap-2">
        {priority && <ListPriority priority={priority} />}
        {incomeAmount && <AccountBalance />}
        {priceOfProduct && <ShoppingCart />}
        {title || ""}
      </label>
    </div>
  );
};

export default ListItemTitle;
