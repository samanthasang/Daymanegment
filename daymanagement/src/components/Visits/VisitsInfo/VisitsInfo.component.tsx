"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import IncomeFilter from "@/lib/Hooks/Filters/IncomeFilter.componen";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { useState } from "react";

function VisitsInfo() {
  const [forgot, setForgot] = useState(false);
  const { ListVisitFiltered, ListVisitForgot, ListVisitAll } = useVisitList();

  const VisitsLenght = ListVisitFiltered.length;
  const VisitsFinishLenght = NotFinishedArray(ListVisitFiltered).length;
  const VisitsNotFinishLenght = FinishedArray(ListVisitFiltered).length;
  const VisitsTodayLenght = ListVisitAll.filter(
    (item) =>
      item.doDate >= currentUnixTimestampZero &&
      item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1)
  );
  const { incomeArray: inComeArray } = IncomeFilter(ListVisitFiltered);
  const VisitsPaymentArray = inComeArray?.reduce((acc, obj) => {
    if (obj.income && obj.paymentCompleteValue) {
      return acc + +obj.paymentCompleteValue;
    }
    return acc;
  }, 0);
  const VisitsAdvanceArray = inComeArray?.reduce((acc, obj) => {
    if (obj.income && obj.advancePayment) {
      return acc + +obj.advancePayment;
    }
    return acc;
  }, 0);
  const TodayVisitsPaymentArray = VisitsTodayLenght?.reduce((acc, obj) => {
    if (obj.income && obj.paymentCompleteValue) {
      return acc + +obj.paymentCompleteValue;
    }
    return acc;
  }, 0);
  const TodayVisitsAdvanceArray = VisitsTodayLenght?.reduce((acc, obj) => {
    if (obj.income && obj.advancePayment) {
      return acc + +obj.advancePayment;
    }
    return acc;
  }, 0);

  const TodayVisitsFinishLenght = NotFinishedArray(VisitsTodayLenght).length;
  const TodayVisitsNotFinishLenght = FinishedArray(VisitsTodayLenght).length;

  const OldVisitsLenght = ListVisitForgot.length;
  const OldVisitsFinishLenght = NotFinishedArray(ListVisitForgot).length;
  const OldVisitsNotFinishLenght = FinishedArray(ListVisitForgot).length;
  const { incomeArray: incomeArray } = IncomeFilter(ListVisitForgot);
  const OldVisitsPaymentArray = incomeArray?.reduce((acc, obj) => {
    if (obj.income && obj.paymentCompleteValue) {
      return acc + +obj.paymentCompleteValue;
    }
    return acc;
  }, 0);
  const OldVisitsAdvanceArray = incomeArray?.reduce((acc, obj) => {
    if (obj.income && obj.advancePayment) {
      return acc + +obj.advancePayment;
    }
    return acc;
  }, 0);

  const tVisits: any = UseLangComponent("Visits");
  const t: any = UseLangComponent("Drawer");
  return (
    <div className="w-full min-w-96 flex flex-col gap-y-2">
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={tVisits.title}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={tVisits.forgotTilte}
        />
      </ListTitleContainer>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>{t.AllVisits}</span>
        {!forgot ? VisitsLenght : OldVisitsLenght}
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>{t.DoneStatus}</span>
        <div
          dir="ltr"
          className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
        >
          <span className="text-successGreen border-r-[1px] pr-1 mr-0.5 border-blue-500">
            {!forgot ? VisitsFinishLenght : OldVisitsFinishLenght}
          </span>
          <span className="text-errorRed">
            {!forgot ? VisitsNotFinishLenght : OldVisitsNotFinishLenght}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>{t.Payment}</span>
        <div
          dir="ltr"
          className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
        >
          <span className="text-successGreen border-r-[1px] pr-1 mr-0.5 border-blue-500">
            {!forgot ? VisitsPaymentArray : OldVisitsPaymentArray}
          </span>
          <span className="text-errorRed">
            {!forgot ? VisitsAdvanceArray : OldVisitsAdvanceArray}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>{t.TodayVisits}</span>
        <div
          dir="ltr"
          className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
        >
          <span className="text-successGreen border-r-[1px] pr-1 mr-0.5 border-blue-500">
            {TodayVisitsFinishLenght}
          </span>
          <span className="text-errorRed">{TodayVisitsNotFinishLenght}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>{t.TodayPayment}</span>
        <div
          dir="ltr"
          className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
        >
          <span className="text-successGreen border-r-[1px] pr-1 mr-0.5 border-blue-500">
            {TodayVisitsPaymentArray}
          </span>
          <span className="text-errorRed">{TodayVisitsAdvanceArray}</span>
        </div>
      </div>
    </div>
  );
}

export default VisitsInfo;
