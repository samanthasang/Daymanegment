"use client";
import { useAppSelector } from "@/lib/hook";
import { TGoals } from "@/modules/goalsList/goals.slice";
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

function useGoalsList() {
  const Goal = useAppSelector((state) => state.Goals);

  const selectedGoal = Goal?.selectedGoal as TGoals;
  const ListGoals = Goal?.ListTGoals as TGoals[];

  const dateFromArray = DateFromFilter([...ListGoals]);

  const dateToArray = DateToFilter([...dateFromArray]);

  const categoryArray = CategoryFilter([...dateToArray]);

  const ListGoalsFiltered = TagFilter([...categoryArray]);

  const ListGoalsForgot = ListGoals.filter(
    (a) => +a.doDate < currentUnixTimestampZero
  );
  const ListGoalsToday = ListGoals.filter(
    (a) =>
      +a.doDate >= currentUnixTimestampZero &&
      +a.doDate < TomorrowUnixTimestampZero
  );
  const oldCategoryArray = CategoryFilter([...ListGoalsForgot]);

  const oldListGoalsFiltered = TagFilter([...oldCategoryArray]);

  const dateUpOrderArray: TGoals[] = DatePlusOrderFilter(ListGoalsFiltered);
  const dateDOwnOrderArray: TGoals[] =
    DateMinusOrderFilter(oldListGoalsFiltered);

  return {
    ListGoalsFiltered: dateUpOrderArray,
    ListGoalsForgot: dateDOwnOrderArray,
    ListGoalsAll: ListGoals,
    selectedGoal,
    ListGoalsToday,
  };
}

export default useGoalsList;
