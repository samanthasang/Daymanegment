"use client";
import SelectedContainer from "@/components/mainPage/selectedItem/SelectedContainer.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import GoalListActivities from "@/lib/Hooks/Lists/Goal/GoalListActivities.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";

function SelectedGoalsList() {
  const { CompleteItemt, DelItem, SelectItem } = GoalListActivities();

  const { selectedGoal } = useGoalsList();

  return (
    <SelectedContainer>
      <SelectedItem
        CompleteItemt={() =>
          CompleteItemt(
            selectedGoal.id,
            selectedGoal.title,
            selectedGoal.score || 0
          )
        }
        drawerType="GoalsList"
        {...selectedGoal}
        score={DayUnixDiff(+selectedGoal.date, "day") + 1}
      />
      <SelectedMenuBottom
        CompleteItemt={() =>
          CompleteItemt(
            selectedGoal.id,
            selectedGoal.title,
            selectedGoal.score || 0
          )
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="GoalsList"
        formType="Edit Goals"
        selectedIsComplete={selectedGoal.isComplete}
      />
    </SelectedContainer>
  );
}

export default SelectedGoalsList;
