"use client";
import { useAppSelector } from "@/lib/hook";
import { TSpends } from "@/modules/spends/spends.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero } from "../../UseDayJS";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";

function useSpendsList() {
  const Spends = useAppSelector((state) => state.SpendsList);

  const selectedSpends = Spends?.selectedSpends as TSpends;
  const ListSpends = Spends.ListSpends as TSpends[];

  const dateFromArray = DateFromFilter([...ListSpends] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListSpendsFiltered = TagFilter([...categoryArray] as any);

  const ListSpendsForgot = ListSpends.filter(
    (a) => +a.doDate < currentUnixTimestampZero
  );
  const dateUpOrderArray: TSpends[] = DatePlusOrderFilter(ListSpendsFiltered);
  const dateDOwnOrderArray: TSpends[] = DateMinusOrderFilter(ListSpendsForgot);

  return {
    ListSpendsFiltered: dateUpOrderArray,
    ListSpendsAll: ListSpends,
    ListSpendsForgot: dateDOwnOrderArray,
    selectedSpends,
  };
}

export default useSpendsList;
