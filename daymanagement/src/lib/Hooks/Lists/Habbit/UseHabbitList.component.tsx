"use client";
import { useAppSelector } from "@/lib/hook";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import TagFilter from "../../Filters/TagFilter.componen";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";

function UseHabbitList() {
  const Habbit = useAppSelector((state) => state.Habbits);

  const selectedHabbit = Habbit?.selectedhabbit as Thabbit;
  const ListHabbit = Habbit?.ListHabbit as Thabbit[];

  const categoryArray = CategoryFilter([...ListHabbit] as any);

  const listAfterFilter = TagFilter([...categoryArray] as any);

  const ListMyHabbit = listAfterFilter.filter((a) => a.score > 9);
  const ListHabbitNew = ListHabbit.filter((a) => a.score <= 9);

  const oldCategoryArray = CategoryFilter([...ListHabbitNew] as any);

  const oldListAfterFilter = TagFilter([...oldCategoryArray] as any);

  const dateUpOrderArray: Thabbit[] = DatePlusOrderFilter(ListMyHabbit);
  const dateDOwnOrderArray: Thabbit[] =
    DateMinusOrderFilter(oldListAfterFilter);

  return {
    ListMyHabbit: dateUpOrderArray,
    ListHabbitAll: ListHabbit,
    ListHabbitNew: dateDOwnOrderArray,
    selectedHabbit,
  };
}

export default UseHabbitList;
