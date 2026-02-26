"use client";
import useTimerList from "@/lib/Hooks/Lists/UseTimerList.component";
import Link from "next/link";

function HomeTimerItem() {
  const ListTimer = useTimerList();

  return (
    <Link
      href={"/timer"}
      className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white"
    >
      <span>Timer</span>
      <span>{`${ListTimer?.filter((todo) => todo.isComplete == true).length} / ${ListTimer?.length}`}</span>
    </Link>
  );
}

export default HomeTimerItem;
