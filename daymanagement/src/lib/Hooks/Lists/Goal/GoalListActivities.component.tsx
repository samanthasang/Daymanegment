"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeGoalList,
  delGoalList,
  selectGoalList,
  TGoals,
  updateGoalList,
} from "@/modules/goalsList/goals.slice";
import { toast } from "react-toastify";
import { currentUnixTimestamp } from "../../UseDayJS";
import useGoalsList from "./UseGoalsList.component";

function GoalListActivities() {
  const dispatch = useAppDispatch();

  const { selectedGoal } = useGoalsList();

  const SelectItem = () => {
    dispatch(selectGoalList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectGoalList(id));
  };
  const DelItem = (id: string, title: string) => {
    dispatch(delGoalList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string, score: number) => {
    dispatch(completeGoalList({ id, score }));
    id && selectedGoal && dispatch(selectGoalList(id));
    toast(`${title} is updated`);
  };
  const BringTodayItem = (item: TGoals) => {
    dispatch(
      updateGoalList({ ...item, doDate: currentUnixTimestamp, score: 0 })
    );
    item.id && selectedGoal && dispatch(selectGoalList(item.id));
    toast(`${item.title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem, BringTodayItem };
}

export default GoalListActivities;
