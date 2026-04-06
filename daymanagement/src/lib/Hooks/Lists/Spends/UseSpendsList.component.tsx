"use client";
import { useAppSelector } from "@/lib/hook";
import { TSpends } from "@/modules/spends/spends.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useSpendsList() {
  const Spends = useAppSelector((state) => state.SpendsList);

  const selectedSpends = Spends?.selectedSpends as TSpends;

  const ListSpends = Spends.ListSpends as TSpends[];

  const dateFromArray = DateFromFilter([...ListSpends] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListSpendsFiltered = TagFilter([...categoryArray] as any);

  const ListSpendsForgot = ListSpends.filter(
    (a) => +a.date < currentUnixTimestampZero
  );

  return {
    ListSpendsFiltered,
    ListSpendsAll: ListSpends,
    ListSpendsForgot,
    selectedSpends,
  };
}

export default useSpendsList;
