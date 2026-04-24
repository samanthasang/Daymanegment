"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import GoalListActivities from "@/lib/Hooks/Lists/Goal/GoalListActivities.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import { TGoals, updateGoalList } from "@/modules/goalsList/goals.slice";
import { useEffect } from "react";

export const GoalsItem = ({ item }: { item: TGoals }) => {
  const dispatch = useAppDispatch();
  const { CompleteItem, DelItem, SelectWithId } = GoalListActivities();
  const { selectedGoal } = useGoalsList();
  useEffect(() => {
    !item.isComplete &&
      dispatch(
        updateGoalList({
          id: item.id,
          title: item.title,
          doDate: item.doDate,
          createDate: item.createDate ?? item.doDate,
          score: DayUnixDiff(+item.doDate, "day"),
          priority: item.priority,
          description: item.description,
          category: item.category,
          tag: item.tag,
        })
      );
  }, []);
  return (
    <ListItem
      date={item.doDate}
      score={
        item.isComplete && item.score
          ? item.score + 1
          : DayUnixDiff(+item.doDate, "day") + 1
      }
      drawerType="GoalsList"
      selectedID={selectedGoal && selectedGoal.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItem={() => CompleteItem(item.id, item.title, item?.score || 0)}
      {...item}
    />
  );
};

export default GoalsItem;
