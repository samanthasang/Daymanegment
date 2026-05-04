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
  const { CompleteItem, DelItem, SelectWithId, BringTodayItem } =
    GoalListActivities();
  const { selectedGoal } = useGoalsList();
  useEffect(() => {
    !item.isComplete &&
      item.score != DayUnixDiff(+item.doDate, "day") &&
      dispatch(
        updateGoalList({
          id: item.id,
          title: item.title,
          doDate: item.doDate,
          createDate: item.createDate ?? item.doDate,
          score: DayUnixDiff(item.doDate, "day") + 1,
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
      drawerType="GoalsList"
      selectedID={selectedGoal && selectedGoal.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItem={() => CompleteItem(item.id, item.title, item?.score || 0)}
      BringToday={() => BringTodayItem(item)}
      {...item}
      score={item.score}
    />
  );
};

export default GoalsItem;
