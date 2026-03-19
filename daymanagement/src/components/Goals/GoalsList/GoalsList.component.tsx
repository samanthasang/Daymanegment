"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import { selectGoalList, TGoals } from "@/modules/goalsList/goals.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import SelectedGoalsList from "../GoalsItem/SelectGoalsList.component";
import GoalsListCurrent from "./GoalsListCurrent.component";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function GoalsList() {
  const dispatch = useAppDispatch();

  const [forgot, setForgot] = useState(false);

  const Goal = useAppSelector((state) => state.Goals);

  const selectedGoal = Goal?.selectedGoal as TGoals;

  const ListGoals = useGoalsList();
  const ListGoalsAll = Goal?.ListTGoals as TGoals[];
  const ListToDoForgot = ListGoalsAll.filter(
    (a) =>
      dayjs(dayjs.unix(Number(a.date))) <
      dayjs(dayjs.unix(Number(currentUnixTimestamp)))
  );

  useEffect(() => {
    ListGoals.length == 0 && dispatch(selectGoalList(""));
  }, [ListGoals]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedGoal}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Goals"
        />
        {!forgot ? (
          <GoalsListCurrent
            ListGoals={ListGoals}
            selectedID={selectedGoal && selectedGoal.id}
          />
        ) : (
          <GoalsListCurrent
            ListGoals={ListToDoForgot}
            selectedID={selectedGoal && selectedGoal.id}
          />
        )}
      </ListContainer>
      {selectedGoal && <SelectedGoalsList />}
    </div>
  );
}

export default GoalsList;
