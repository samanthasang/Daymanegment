"use client";
import { useAppSelector } from "@/lib/hook";
import { TGoals } from "@/modules/goalsList/goals.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useGoalsList() {
  const Goal = useAppSelector((state) => state.Goals);

  const selectedGoal = Goal?.selectedGoal as TGoals;
  const ListGoals = Goal?.ListTGoals as TGoals[];

  const dateFromArray = DateFromFilter([...ListGoals] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListGoalsFiltered = TagFilter([...categoryArray] as any);

  const ListGoalsForgot = ListGoals.filter(
    (a) => +a.date < currentUnixTimestampZero
  );

  return {
    ListGoalsFiltered,
    ListGoalsForgot,
    ListGoalsAll: ListGoals,
    selectedGoal,
  };
}

export default useGoalsList;
