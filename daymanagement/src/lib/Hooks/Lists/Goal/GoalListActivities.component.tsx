"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  completeGoalList,
  delGoalList,
  selectGoalList,
  TGoals,
} from "@/modules/goalsList/goals.slice";
import { toast } from "react-toastify";

function GoalListActivities() {
  const dispatch = useAppDispatch();

  const Goal = useAppSelector((state) => state.Goals);

  const selectedhabbit = Goal?.selectedGoal as TGoals;

  const SelectItem = () => {
    dispatch(selectGoalList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectGoalList(id));
  };
  const DelItem = () => {
    dispatch(delGoalList(selectedhabbit.id));
    SelectItem();
    toast(`${selectedhabbit.title} is deleted`);
  };
  const CompleteItem = (id: string, title: string, score: number) => {
    dispatch(completeGoalList({ id, score }));
    id && selectedhabbit && dispatch(selectGoalList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem };
}

export default GoalListActivities;
