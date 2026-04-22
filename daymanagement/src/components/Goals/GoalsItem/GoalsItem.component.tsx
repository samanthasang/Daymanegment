"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import GoalListActivities from "@/lib/Hooks/Lists/Goal/GoalListActivities.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import { TGoals } from "@/modules/goalsList/goals.slice";

export const GoalsItem = ({ item }: { item: TGoals }) => {
  const { CompleteItem, DelItem, SelectWithId } = GoalListActivities();
  const { selectedGoal } = useGoalsList();

  return (
    <ListItem
      date={item.doDate}
      score={item.score ?? DayUnixDiff(+item.doDate, "day") + 1}
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
