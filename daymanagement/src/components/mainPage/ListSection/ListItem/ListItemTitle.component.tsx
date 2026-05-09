import {
  BadgeDollarSign,
  BookUser,
  CircleDollarSign,
  CircleOff,
  CircuitBoard,
  PauseCircle,
  ShoppingCart,
} from "lucide-react";
import ListPriority from "../ListPriority/ListPriority.component";
import ListItemsIcon from "./ListItemsIcon.component";

export const ListItemTitle = ({
  priority,
  title,
  incomeAmount,
  priceOfProduct,
  withShare,
  isPause,
  isFinish,
  drawerType,
  visitId,
  spendsId,
  paymentCompleteValue,
}: {
  priority?: string;
  title: string;
  incomeAmount?: string;
  priceOfProduct?: string;
  withShare?: boolean;
  isPause?: boolean;
  isFinish?: boolean;
  drawerType: string;
  visitId?: string;
  spendsId?: string;
  paymentCompleteValue?: string;
}) => {
  return (
    <div className="flex justify-start items-start gap-y-0.5">
      <div className="flex flex-row items-center gap-x-1 flex-1">
        {drawerType && ListItemsIcon(drawerType, 36)}
        <div className="h-8 flex justify-center items-center cursor-pointer gap-x-0.5">
          {priority && <ListPriority priority={priority} />}
          {drawerType != "Shares" && incomeAmount && (
            <CircleDollarSign
              width={16}
              height={16}
              className="text-successGreen"
            />
          )}
          {isFinish && (
            <CircleOff width={16} height={16} className="text-successGreen" />
          )}
          {isPause && (
            <PauseCircle width={16} height={16} className="text-blue-500" />
          )}
          {visitId && <BookUser width={16} height={16} />}
          {(paymentCompleteValue || spendsId) && (
            <BadgeDollarSign
              width={16}
              height={16}
              className={paymentCompleteValue && "text-blue-500"}
            />
          )}
          {drawerType != "shares" && priceOfProduct && (
            <ShoppingCart width={16} height={16} className="text-errorRed" />
          )}
          {withShare && (
            <CircuitBoard width={16} height={16} className="text-blue-500" />
          )}
          <span className="whitespace-break-spaces text-nowrap">
            {title || ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListItemTitle;
