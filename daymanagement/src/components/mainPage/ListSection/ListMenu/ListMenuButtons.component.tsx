"use client";
import SwitchComponent from "@/components/FormItem/SwitchComponent";
import {
  ChevronSmallTripleUp
} from "@/components/icons";
import {
  CheckCircle,
  DollarSign,
  SeparatorVertical,
  ShoppingBag
} from "lucide-react";

function ListMenuButtons({
  withpriority,
  withShop,
  withBalance,
  withFinish,
  withComplateSort,
  shopFilter,
  balanceFilter,
  priorityFilter,
  dateFIlter,
  complateFIlter,
  ChangePriority,
  ChangeShop,
  ChangeBalance,
  ChangeDate,
  ChangeComplate,
}: {
  withpriority?: boolean;
  withShop?: boolean;
  withBalance?: boolean;
  withFinish?: boolean;
  withComplateSort?: boolean;
  shopFilter?: boolean;
  balanceFilter?: boolean;
  priorityFilter?: boolean;
  dateFIlter?: boolean;
  complateFIlter?: boolean;
  ChangePriority?: () => void;
  ChangeShop?: () => void;
  ChangeBalance?: () => void;
  ChangeComplate?: () => void;
  ChangeDate?: () => void;
}) {
  return (
    <>
      {withFinish && (
        <SwitchComponent
          ChangeStatus={ChangeDate && ChangeDate}
          checkStatus={dateFIlter}
        >
          <CheckCircle />
        </SwitchComponent>
      )}
      {withComplateSort && (
        <SwitchComponent
          ChangeStatus={ChangeComplate && ChangeComplate}
          checkStatus={complateFIlter}
        >
          <SeparatorVertical />
        </SwitchComponent>
      )}
      {withpriority && (
        <SwitchComponent
          ChangeStatus={ChangePriority && ChangePriority}
          checkStatus={priorityFilter}
        >
          <ChevronSmallTripleUp className="fill-red-500" />
        </SwitchComponent>
      )}
      {withShop && (
        <SwitchComponent
          ChangeStatus={ChangeShop && ChangeShop}
          checkStatus={shopFilter}
        >
          <ShoppingBag width={16} height={16} />
        </SwitchComponent>
      )}
      {withBalance && (
        <SwitchComponent
          ChangeStatus={ChangeBalance && ChangeBalance}
          checkStatus={balanceFilter}
        >
          <DollarSign width={16} height={16} />
        </SwitchComponent>
      )}
    </>
  );
}

export default ListMenuButtons;
