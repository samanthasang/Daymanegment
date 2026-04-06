"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import SelectedGoalsList from "../GoalsItem/SelectGoalsList.component";
import GoalsListCurrent from "./GoalsListCurrent.component";

function GoalsList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();

  const { ListGoalsFiltered, ListGoalsForgot, selectedGoal } = useGoalsList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedGoal) || isSMMin) && (
        <ListContainer selectedID={!!selectedGoal}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Goals"
            listCount={
              ListGoalsFiltered.length > 0
                ? ListGoalsFiltered?.filter((item) => !item.isComplete).length
                : undefined
            }
            secListCount={
              ListGoalsForgot.length > 0
                ? ListGoalsForgot?.filter((item) => !item.isComplete).length
                : undefined
            }
          />
          {!forgot ? (
            <GoalsListCurrent
              ListGoals={ListGoalsFiltered}
              selectedID={selectedGoal && selectedGoal.id}
            />
          ) : (
            <GoalsListCurrent
              ListGoals={ListGoalsForgot}
              selectedID={selectedGoal && selectedGoal.id}
            />
          )}
        </ListContainer>
      )}
      {selectedGoal && <SelectedGoalsList />}
    </div>
  );
}

export default GoalsList;
