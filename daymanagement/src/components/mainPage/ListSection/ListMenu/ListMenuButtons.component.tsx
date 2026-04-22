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
  withdate,
  withcomplate,
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
  withdate?: boolean;
  withcomplate?: boolean;
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
      {withdate && (
        <SwitchComponent
          ChangeStatus={ChangeDate && ChangeDate}
          checkStatus={dateFIlter}
        >
          <DoneAll />
        </SwitchComponent>
      )}
      {withcomplate && (
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
