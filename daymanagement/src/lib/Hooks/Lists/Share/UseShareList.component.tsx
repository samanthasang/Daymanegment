"use client";
import { useAppSelector } from "@/lib/hook";
import { TShare } from "@/modules/share/share.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useShareList() {
  const Share = useAppSelector((state) => state.ShareList) || [];

  const selectedShare = Share?.selectedShare as TShare;
  const ListShare = Share?.ListShare as TShare[];

  const dateFromArray = DateFromFilter([...ListShare] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListShareFiltered: TShare[] = TagFilter([...categoryArray] as any);

  const ListToDoForgot = ListShare.filter(
    (item) => +item.doDate < currentUnixTimestampZero
  );

  const dateUpOrderArray: TShare[] = DatePlusOrderFilter(ListShareFiltered);
  const dateDOwnOrderArray: TShare[] = DateMinusOrderFilter(ListToDoForgot);

  return {
    ListShareFriends: dateUpOrderArray,
    ListShareAll: ListShare,
    ListShareForgot: dateDOwnOrderArray,
    selectedShare,
  };
}

export default useShareList;
