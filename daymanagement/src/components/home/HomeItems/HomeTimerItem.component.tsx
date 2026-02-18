"use client";
import useTimerList from "@/lib/Hooks/Lists/UseTimerList.component";

function HomeTimerItem() {
  const ListTimer = useTimerList();

  return (
    <div className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white">
      <span>Timer</span>
      <span>{`${ListTimer?.filter((todo) => todo.isComplete == true).length} / ${ListTimer?.length}`}</span>
    </div>
  );
}

export default HomeTimerItem;
