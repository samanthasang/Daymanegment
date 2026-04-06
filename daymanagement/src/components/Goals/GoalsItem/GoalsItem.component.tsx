"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import GoalListActivities from "@/lib/Hooks/Lists/Goal/GoalListActivities.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import {
  TGoals
} from "@/modules/goalsList/goals.slice";

export const GoalsItem = ({
  item,
  selectedID,
}: {
  item: TGoals;
  selectedID?: string;
}) => {
  const { CompleteItemt, DelItem, SelectWithId } = GoalListActivities();

  return (
    <ListItem
      id={item.id}
      priority={item.priority}
      title={item.title}
      category={item.category}
      tag={item.tag}
      isComplete={item.isComplete}
      date={item.date}
      score={DayUnixDiff(+item.date, "day") + 1}
      drawerType="GoalsList"
      formType="Edit Goals"
      selectedID={selectedID}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItemt={() => CompleteItemt(item.id, item.title, item?.score || 0)}
    />
  );
};

export default GoalsItem;
