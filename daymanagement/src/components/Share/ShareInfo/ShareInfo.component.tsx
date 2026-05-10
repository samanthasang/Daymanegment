"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import IncomeFilter from "@/lib/Hooks/Filters/IncomeFilter.componen";
import IncomeMFilter from "@/lib/Hooks/Filters/IncomeMFilter.componen";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";

function ShareInfo() {
  const [forgot, setForgot] = useState(false);
  const { ListShareFriends, ListShareForgot, ListShareAll } = useShareList();

  const SharesLenght = ListShareFriends.length;
  const { incomeArray: inComeArray } = IncomeFilter(ListShareFriends);
  const { incomeMArray: outComeArray } = IncomeMFilter(ListShareFriends);
  const SharesIncomeArray = inComeArray?.reduce((acc, obj) => {
    if (obj.income && obj.incomeAmount) {
      return acc + +obj.incomeAmount;
    }
    return acc;
  }, 0);
  const SharesOutcomeArray = outComeArray?.reduce((acc, obj) => {
    if (!obj.income && obj.outcomeAmount) {
      return acc + +obj.outcomeAmount;
    }
    return acc;
  }, 0);

  const OldSharesLenght = ListShareForgot.length;
  const { incomeArray } = IncomeFilter(ListShareForgot);
  const { incomeMArray: outcomeArray } = IncomeMFilter(ListShareForgot);
  const OldSharesInComeArray = incomeArray?.reduce((acc, obj) => {
    if (obj.income && obj.incomeAmount) {
      return acc + +obj.incomeAmount;
    }
    return acc;
  }, 0);
  const OldSharesOutComeArray = outcomeArray?.reduce((acc, obj) => {
    if (!obj.income && obj.outcomeAmount) {
      return acc + +obj.outcomeAmount;
    }
    return acc;
  }, 0);

  const EarnToday = inComeArray
    .filter(
      (item) =>
        +item.doDate >= currentUnixTimestampZero &&
        +item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1)
    )
    .reduce((acc, obj) => {
      if (obj.income && obj.incomeAmount) {
        return acc + +obj.incomeAmount;
      }
      return acc;
    }, 0);
  const SharesToday = outComeArray
    .filter(
      (item) =>
        +item.doDate >= currentUnixTimestampZero &&
        +item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1)
    )
    .reduce((acc, obj) => {
      if (!obj.income && obj.outcomeAmount) {
        return acc + +obj.outcomeAmount;
      }
      return acc;
    }, 0);

  return (
    <div className="w-full min-w-96 flex flex-col gap-y-2">
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={"Shares"}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={"Old Shares"}
        />
      </ListTitleContainer>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>All Shares :</span>
        {!forgot ? SharesLenght : OldSharesLenght}
      </div>
      <div className="flex justify-between items-center text-successGreen bg-primary py-1 px-3 rounded-3xl">
        <span>Earn :</span>
        {!forgot ? (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-successGreen"
            />
            <label>{SharesIncomeArray}</label>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-successGreen"
            />
            <label>{OldSharesInComeArray}</label>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-errorRed bg-primary py-1 px-3 rounded-3xl">
        <span>Shares :</span>
        {!forgot ? (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-errorRed"
            />
            <label>{SharesOutcomeArray}</label>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-errorRed"
            />
            <label>{OldSharesOutComeArray}</label>
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex justify-between items-center text-errorRed bg-primary py-1 px-3 rounded-3xl",
          SharesIncomeArray - SharesOutcomeArray > 0 ||
            OldSharesInComeArray - OldSharesOutComeArray > 0
            ? "text-successGreen"
            : "text-errorRed"
        )}
      >
        <span className="text-blue-500">Total :</span>
        {!forgot ? (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-successGreen"
            />
            <label>{SharesIncomeArray - SharesOutcomeArray}</label>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-successGreen"
            />
            <label>{OldSharesInComeArray - OldSharesOutComeArray}</label>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>Today :</span>
        <div className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-1">
          <div className="flex items-center gap-x-1 text-successGreen border-r-2 border-blue-500 pr-1">
            <CircleDollarSign width={16} height={16} />
            <label>{EarnToday}</label>
          </div>
          <div className="flex items-center gap-x-1 text-errorRed">
            <CircleDollarSign width={16} height={16} />
            <label>{SharesToday}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShareInfo;
