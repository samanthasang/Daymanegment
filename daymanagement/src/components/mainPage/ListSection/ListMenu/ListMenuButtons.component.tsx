"use client";
import SwitchComponent from "@/components/FormItem/SwitchComponent";
import {
  AccountBalance,
  ChevronSmallTripleUp,
  Done,
  DoneAll,
  ShoppingCart,
} from "@/components/icons";

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
          <DoneAll />
        </SwitchComponent>
      )}
      {withComplateSort && (
        <SwitchComponent
          ChangeStatus={ChangeComplate && ChangeComplate}
          checkStatus={complateFIlter}
        >
          <Done />
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
          <ShoppingCart className="fill-red-500" />
        </SwitchComponent>
      )}
      {withBalance && (
        <SwitchComponent
          ChangeStatus={ChangeBalance && ChangeBalance}
          checkStatus={balanceFilter}
        >
          <AccountBalance className="fill-red-500" />
        </SwitchComponent>
      )}
    </>
  );
}

export default ListMenuButtons;
