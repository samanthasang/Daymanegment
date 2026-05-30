"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import GoalListActivities from "@/lib/Hooks/Lists/Goal/GoalListActivities.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import { DayUnixDiff } from "@/lib/Hooks/UseDayJS";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function GoalsList() {
  const { ListGoalsFiltered, ListGoalsForgot, selectedGoal } = useGoalsList();
  const {
    CompleteItem,
    DelItem,
    SelectItem,
    BringTodayItem,
    DuplicateTodayItem,
    AddDayToItem,
  } = GoalListActivities();

  return (
    <>
      <ListSection
        drawerType="Goals"
        formType="Add"
        drawerTitle="Goal"
        selectedID={selectedGoal && !!selectedGoal.id}
        ListFilteredTilte="Goals"
        ListForgotTilte="Old Goals"
        ListFilteredCount={FinishedArray(ListGoalsFiltered).length}
        ListForgotCount={FinishedArray(ListGoalsForgot).length}
        ListFiltered={ListGoalsFiltered as []}
        ListForgot={ListGoalsForgot as []}
        withpriority
        withFinish
        withComplateSort
      />
      <SelectedSection
        drawerType="Goals"
        formType="Edit"
        drawerTitle="Goal"
        isComplete={(selectedGoal && selectedGoal.isComplete) || false}
        CompleteItem={() =>
          CompleteItem(
            selectedGoal.id,
            selectedGoal.title,
            selectedGoal.score || 0
          )
        }
        UndoneItem={() =>
          CompleteItem(
            selectedGoal.id,
            selectedGoal.title,
            selectedGoal.score || 0
          )
        }
        score={
          (selectedGoal && selectedGoal.score) ||
          (selectedGoal &&
            selectedGoal.doDate &&
            DayUnixDiff(+selectedGoal.doDate, "day") + 1)
        }
        DelItem={() => DelItem(selectedGoal.id, selectedGoal.title)}
        SelectItem={() => SelectItem()}
        BringTodayItem={() => BringTodayItem({ ...selectedGoal })}
        DuplicateTodayItem={() => DuplicateTodayItem({ ...selectedGoal })}
        AddOneDayToItem={() => AddDayToItem({ ...selectedGoal }, 1)}
        AddSevenDaysToItem={() => AddDayToItem({ ...selectedGoal }, 7)}
        selected={selectedGoal}
      />
    </>
  );
}

export default GoalsList;
