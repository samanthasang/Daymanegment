"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import GoalListActivities from "@/lib/Hooks/Lists/Goal/GoalListActivities.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import { cn } from "@/lib/utils";
import {
  selectGoalList,
  TGoals
} from "@/modules/goalsList/goals.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect } from "react";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

function GoalsList() {
  const dispatch = useAppDispatch();

  const Goal = useAppSelector((state) => state.Goals);
  const ListGoals = useGoalsList();

  const { CompleteItemt, DelItem, SelectItem, SelectWithId } =
    GoalListActivities();
  const { priorityArray, priorityFilter, setPriorityFilter } = PriorityFilter(
    ListGoals as any
  );

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...ListGoals] as any);

  const selectedGoal = Goal?.selectedGoal as TGoals;

  useEffect(() => {
    ListGoals.length == 0 && dispatch(selectGoalList(""));
  }, [ListGoals]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer listTitle="Goals" selectedID={!!selectedGoal}>
        <div
          className={cn(
            "flex flex-col h-full gap-y-2",
            (ListGoals && ListGoals.length !== 0) || false
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListGoals?.length == 0 ? (
            <EmptyList />
          ) : (
            ListGoals?.map((li: TGoals) => (
              <ListItem
                key={li.id}
                drawerType="GoalsList"
                formType="Add Goals"
                selectedID={selectedGoal && selectedGoal.id}
                SelectItem={() => SelectWithId(li.id)}
                DelItem={DelItem}
                CompleteItemt={() =>
                  CompleteItemt(li.id, li.title, li.score || 0)
                }
                {...li}
              />
            ))
          )}
        </div>
        <ListMenuBottom
          listTitle="Goals"
          drawerType="GoalsList"
          formType="Add Goals"
          selectedID={!!selectedGoal}
          withpriority
          withcomplate
          priorityFilter={priorityFilter}
          complateFIlter={complateFIlter}
          ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
          ChangePriority={() => setPriorityFilter(!priorityFilter)}
          ListInfo={`${ListGoals?.filter((todo) => todo.isComplete == true).length} / ${ListGoals?.length}`}
        />
      </ListContainer>
      {selectedGoal && (
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
      )}
    </div>
  );
}

export default GoalsList;
