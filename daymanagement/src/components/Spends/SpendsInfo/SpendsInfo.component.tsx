"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import IncomeFilter from "@/lib/Hooks/Filters/IncomeFilter.componen";
import IncomeMFilter from "@/lib/Hooks/Filters/IncomeMFilter.componen";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";

function SpendsInfo() {
  const [forgot, setForgot] = useState(false);
  const { ListSpendsFiltered, ListSpendsForgot } = useSpendsList();

  const SpendsLenght = ListSpendsFiltered.length;
  const { incomeArray: inComeArray } = IncomeFilter(ListSpendsFiltered);
  const { incomeMArray: outComeArray } = IncomeMFilter(ListSpendsFiltered);
  const SpendsIncomeArray = inComeArray?.reduce((acc, obj) => {
    if (obj.income && obj.incomeAmount) {
      return acc + +obj.incomeAmount;
    }
    return acc;
  }, 0);
  const SpendsOutcomeArray = outComeArray?.reduce((acc, obj) => {
    if (!obj.income && obj.priceOfProduct) {
      return acc + +obj.priceOfProduct;
    }
    return acc;
  }, 0);

  const OldSpendsLenght = ListSpendsForgot.length;
  const { incomeArray } = IncomeFilter(ListSpendsForgot);
  const { incomeMArray: outcomeArray } = IncomeMFilter(ListSpendsForgot);
  const OldSpendsInComeArray = incomeArray?.reduce((acc, obj) => {
    if (obj.income && obj.incomeAmount) {
      return acc + +obj.incomeAmount;
    }
    return acc;
  }, 0);
  const OldSpendsOutComeArray = outcomeArray?.reduce((acc, obj) => {
    if (!obj.income && obj.priceOfProduct) {
      return acc + +obj.priceOfProduct;
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
  const SpendsToday = outComeArray
    .filter(
      (item) =>
        +item.doDate >= currentUnixTimestampZero &&
        +item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1)
    )
    .reduce((acc, obj) => {
      if (!obj.income && obj.priceOfProduct) {
        return acc + +obj.priceOfProduct;
      }
      return acc;
    }, 0);

  return (
    <div className="w-full min-w-96 flex flex-col gap-y-2">
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={"Spends"}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={"Old Spends"}
        />
      </ListTitleContainer>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>All Spends :</span>
        {!forgot ? SpendsLenght : OldSpendsLenght}
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
            <label>{SpendsIncomeArray}</label>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-successGreen"
            />
            <label>{OldSpendsInComeArray}</label>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center text-errorRed bg-primary py-1 px-3 rounded-3xl">
        <span>Spends :</span>
        {!forgot ? (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-errorRed"
            />
            <label>{SpendsOutcomeArray}</label>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-errorRed"
            />
            <label>{OldSpendsOutComeArray}</label>
          </div>
        )}
      </div>
      <div
        className={cn(
          "flex justify-between items-center text-errorRed bg-primary py-1 px-3 rounded-3xl",
          SpendsIncomeArray - SpendsOutcomeArray > 0 ||
            OldSpendsInComeArray - OldSpendsOutComeArray > 0
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
            <label>{SpendsIncomeArray - SpendsOutcomeArray}</label>
          </div>
        ) : (
          <div className="flex items-center gap-x-1">
            <CircleDollarSign
              width={16}
              height={16}
              className="text-successGreen"
            />
            <label>{OldSpendsInComeArray - OldSpendsOutComeArray}</label>
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
            <label>{SpendsToday}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpendsInfo;
