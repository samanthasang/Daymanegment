"use client";
import { useAppSelector } from "@/lib/hook";
import { TShare } from "@/modules/share/share.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import UseSearchParams from "../../UseSearchParams";

function useShareList() {
  const Share = useAppSelector((state) => state.ShareList) || [];
  const { hasdateFrom, dateFrom } = UseSearchParams();

  const ListShare = Share?.ListShare as TShare[];

  const dateFromArray =
    hasdateFrom && !!dateFrom
      ? DateFromFilter([...ListShare] as any)
      : [...ListShare];

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListToDoFiltered: TShare[] = TagFilter([...categoryArray] as any);

  return ListToDoFiltered;
}

export default useShareList;
