"use client";
import useTodoList from "@/lib/Hooks/Lists/UseTodoList.component";
import Link from "next/link";

function HomeTodoList() {
  const ListToDo = useTodoList();

  return (
    <Link
      href={"/todo"}
      className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white"
    >
      <span>Todo</span>
      <span>{`${ListToDo?.filter((todo) => todo.isComplete == true).length} / ${ListToDo?.length}`}</span>
    </Link>
  );
}

export default HomeTodoList;
