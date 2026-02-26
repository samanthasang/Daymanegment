"use client";
import useVisitList from "@/lib/Hooks/Lists/UseVisitList.component";
import Link from "next/link";

function HomeVisitItem() {
  const ListVisit = useVisitList();

  return (
    <Link
      href={"/visits"}
      className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white"
    >
      <span>Visits</span>
      <span>{`${ListVisit && ListVisit.length}`}</span>
    </Link>
  );
}

export default HomeVisitItem;
