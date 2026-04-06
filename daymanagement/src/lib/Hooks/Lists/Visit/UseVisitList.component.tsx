"use client";
import { useAppSelector } from "@/lib/hook";
import { TVisit } from "@/modules/visitsList/visit.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useVisitList() {
  const Visit = useAppSelector((state) => state.visit);

  const selectedVisit = Visit?.selectedVisit as TVisit;

  const ListVisit = Visit.ListVisit as TVisit[];

  const dateFromArray = DateFromFilter([...ListVisit] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListVisitFiltered = TagFilter([...categoryArray] as any);

  const ListVisitForgot = ListVisit.filter(
    (a) => +a.date < currentUnixTimestampZero
  );

  return {
    ListVisitFiltered,
    ListVisitForgot,
    ListVisitAll: ListVisit,
    selectedVisit,
  };
}

export default useVisitList;
