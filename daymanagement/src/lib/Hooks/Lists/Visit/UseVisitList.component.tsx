"use client";
import { useAppSelector } from "@/lib/hook";
import { TVisit } from "@/modules/visitsList/visit.slice";
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

function useVisitList() {
  const Visit = useAppSelector((state) => state.Visits);

  const selectedVisit = Visit?.selectedVisit as TVisit;
  const ListVisit = Visit.ListVisit as TVisit[];

  const dateFromArray = DateFromFilter([...ListVisit]);

  const dateToArray = DateToFilter([...dateFromArray]);

  const categoryArray = CategoryFilter([...dateToArray]);

  const ListVisitFiltered = TagFilter([...categoryArray]);

  const ListVisitForgot = ListVisit.filter(
    (a) => +a.doDate < currentUnixTimestampZero
  );
  const ListVisitToday = ListVisit.filter(
    (a) =>
      +a.doDate >= currentUnixTimestampZero &&
      +a.doDate < TomorrowUnixTimestampZero
  );
  const oldCategoryArray = CategoryFilter([...ListVisitForgot]);

  const oldListVisitFiltered = TagFilter([...oldCategoryArray]);

  const dateUpOrderArray: TVisit[] = DatePlusOrderFilter(ListVisitFiltered);
  const dateDOwnOrderArray: TVisit[] =
    DateMinusOrderFilter(oldListVisitFiltered);

  return {
    ListVisitFiltered: dateUpOrderArray,
    ListVisitForgot: dateDOwnOrderArray,
    ListVisitAll: ListVisit,
    ListVisitToday,
    selectedVisit,
  };
}

export default useVisitList;
