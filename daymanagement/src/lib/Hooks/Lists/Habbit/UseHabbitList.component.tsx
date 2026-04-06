"use client";
import { useAppSelector } from "@/lib/hook";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";

function UseHabbitList() {
  const Habbit = useAppSelector((state) => state.habbitList);

  const selectedHabbit = Habbit?.selectedhabbit as Thabbit;
  const ListHabbit = Habbit?.ListHabbit as Thabbit[];

  const categoryArray = CategoryFilter([...ListHabbit] as any);

  const listAfterFilter = TagFilter([...categoryArray] as any);

  const ListMyHabbit = listAfterFilter.filter((a) => a.score > 9);
  const ListHabbitNew = ListHabbit.filter((a) => a.score <= 9);

  console.log(ListHabbit);
  console.log(listAfterFilter);
  console.log(ListMyHabbit);
  console.log(ListHabbitNew);

  return {
    ListMyHabbit,
    ListHabbitAll: ListHabbit,
    ListHabbitNew,
    selectedHabbit,
  };
}

export default UseHabbitList;
