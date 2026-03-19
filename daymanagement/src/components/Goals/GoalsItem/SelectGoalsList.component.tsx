"use client";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import GoalListActivities from "@/lib/Hooks/Lists/Goal/GoalListActivities.component";
import { TGoals } from "@/modules/goalsList/goals.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function SelectedGoalsList() {
  const Goal = useAppSelector((state) => state.Goals);

  const { CompleteItemt, DelItem, SelectItem } = GoalListActivities();

  const selectedGoal = Goal?.selectedGoal as TGoals;

  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
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
        score={
          dayjs
            .unix(+selectedGoal.date)
            .diff(dayjs.unix(currentUnixTimestamp), "day") + 1
        }
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
    </div>
  );
}

export default SelectedGoalsList;
