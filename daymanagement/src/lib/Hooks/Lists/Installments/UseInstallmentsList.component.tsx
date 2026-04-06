"use client";
import { useAppSelector } from "@/lib/hook";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromInstallmentsFilter from "../../Filters/DateFromInstallmentsFilter";
import DateToInstallmentsFilter from "../../Filters/DateToInstallmentsFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useInstallmentsList() {
  const Installmentst = useAppSelector((state) => state.InstallmentstList);

  const selectedInstallmentstList =
    Installmentst?.selectedInstallmentst as TInstallmentsts;

  const ListInstallments =
    Installmentst?.ListInstallmentst as TInstallmentsts[];

  const dateFromArray = DateFromInstallmentsFilter([
    ...ListInstallments,
  ] as any);

  const dateToArray = DateToInstallmentsFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListInstallmentsFiltered = TagFilter([...categoryArray] as any);

  const ListInstallmentsForgot = ListInstallments.filter((a) =>
    a.installmentstList.filter((ins) => !ins.isComplete)[0]
      ? a.installmentstList.filter((ins) => !ins.isComplete)[0].date
      : +a.lastUpdate < currentUnixTimestampZero
  );
  return {
    ListInstallmentsFiltered,
    ListInstallmentsForgot,
    ListInstallmentsAll: ListInstallments,
    selectedInstallmentstList,
  };
}

export default useInstallmentsList;
