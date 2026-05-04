"use client";
import { useAppSelector } from "@/lib/hook";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import NextDateOrderMinusFilter from "../../ListFilter/NextDateOrderMinusFilter.component";
import NextDateOrderPlusFilter from "../../ListFilter/NextDateOrderPlusFilter.component";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useInstallmentsList() {
  const Installmentst = useAppSelector((state) => state.Installments);

  const selectedInstallmentstList =
    Installmentst?.selectedInstallmentst as TInstallmentsts;
  const ListInstallments =
    Installmentst?.ListInstallmentst as TInstallmentsts[];

  const dateFromArray = DateFromFilter([...ListInstallments]);

  const dateToArray = DateToFilter([...dateFromArray]);

  const categoryArray = CategoryFilter([...dateToArray]);

  const ListInstallmentsFiltered = TagFilter([...categoryArray]);

  const ListInstallmentsForgot = ListInstallments.filter(
    (a) => +a.doDate < currentUnixTimestampZero
  );

  const oldCategoryArray = CategoryFilter([...ListInstallmentsForgot]);

  const oldListInstallmentsFiltered = TagFilter([...oldCategoryArray]);

  const dateUpOrderArray: TInstallmentsts[] = NextDateOrderPlusFilter(
    ListInstallmentsFiltered
  );
  const dateDOwnOrderArray: TInstallmentsts[] = NextDateOrderMinusFilter(
    oldListInstallmentsFiltered
  );

  return {
    ListInstallmentsFiltered: dateUpOrderArray,
    ListInstallmentsForgot: dateDOwnOrderArray,
    ListInstallmentsAll: ListInstallments,
    selectedInstallmentstList,
  };
}

export default useInstallmentsList;
