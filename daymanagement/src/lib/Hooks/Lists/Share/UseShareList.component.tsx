"use client";
import { useAppSelector } from "@/lib/hook";
import { TShare } from "@/modules/share/share.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";

function useShareList() {
  const {
    ListShare,
  }: {
    ListShare: TShare[];
    selectedShare: {};
  } = useAppSelector((state) => state.ShareList) || [];

  const dateFromArray = DateFromFilter([...ListShare] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListToDoFiltered = TagFilter([...categoryArray] as any);

  return ListToDoFiltered;
}

export default useShareList;
