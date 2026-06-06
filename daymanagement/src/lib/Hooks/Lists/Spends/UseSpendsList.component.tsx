"use client";
import { useAppSelector } from "@/lib/hook";
import { TSpends } from "@/modules/spends/spends.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import {
  currentUnixTimestampZero,
  TomorrowUnixTimestampZero,
} from "../../UseDayJS";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";

function useSpendsList() {
  const Spends = useAppSelector((state) => state.Spends);

  const selectedSpends = Spends?.selectedSpends as TSpends;
  const ListSpends = Spends.ListSpends as TSpends[];

  const dateFromArray = DateFromFilter(ListSpends);

  const dateToArray = DateToFilter(dateFromArray);

  const categoryArray = CategoryFilter(dateToArray);

  const ListSpendsFiltered = TagFilter(categoryArray);

  const ListSpendsForgot = ListSpends.filter(
    (a) => +a.doDate < currentUnixTimestampZero
  );
  const ListSpendsToday = ListSpends.filter(
    (a) =>
      +a.doDate >= currentUnixTimestampZero &&
      +a.doDate < TomorrowUnixTimestampZero
  );
  const oldCategoryArray = CategoryFilter(ListSpendsForgot);

  const oldListSpendsFiltered = TagFilter(oldCategoryArray);

  const dateUpOrderArray: TSpends[] = DatePlusOrderFilter(ListSpendsFiltered);
  const dateDOwnOrderArray: TSpends[] = DateMinusOrderFilter(
    oldListSpendsFiltered
  );

  return {
    ListSpendsFiltered: dateUpOrderArray,
    ListSpendsAll: ListSpends,
    ListSpendsForgot: dateDOwnOrderArray,
    ListSpendsToday,
    selectedSpends,
  };
}

export default useSpendsList;
