"use client";
import useGoalsList from "@/lib/Hooks/Lists/UseGoalsList.component";

function HomeGoalsItem() {
  const ListGoals = useGoalsList();

  return (
    <div className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white">
      <span>Goals</span>
      <span>{`${ListGoals?.filter((todo) => todo.isComplete == true).length} / ${ListGoals?.length}`}</span>
    </div>
  );
}

export default HomeGoalsItem;
