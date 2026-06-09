"use client";
import { useAppSelector } from "@/lib/hook";
import { TShare } from "@/modules/share/share.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import {
  currentUnixTimestampZero,
  TomorrowUnixTimestampZero,
} from "../../UseDayJS";

function useShareList() {
  const Share = useAppSelector((state) => state.Shares) || [];

  const selectedShare = Share?.selectedShare as TShare;
  const ListShare = Share?.ListShare as TShare[];

  const dateFromArray = DateFromFilter([...ListShare] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListShareFiltered: TShare[] = TagFilter([...categoryArray] as any);

  const ListToDoForgot = ListShare.filter(
    (item) => +item.doDate < currentUnixTimestampZero
  );
  const ListSharesToday = ListShare.filter(
    (a) =>
      +a.doDate >= currentUnixTimestampZero &&
      +a.doDate < TomorrowUnixTimestampZero
  );
  const oldCategoryArray = CategoryFilter([...ListToDoForgot] as any);

  const oldListShareFiltered: TShare[] = TagFilter([
    ...oldCategoryArray,
  ] as any);

  const dateUpOrderArray: TShare[] = DatePlusOrderFilter(ListShareFiltered);
  const dateDOwnOrderArray: TShare[] =
    DateMinusOrderFilter(oldListShareFiltered);

  return {
    ListShareFriends: dateUpOrderArray,
    ListShareAll: ListShare,
    ListShareForgot: dateDOwnOrderArray,
    selectedShare,
    ListSharesToday,
  };
}

export default useShareList;
