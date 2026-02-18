"use client";
import useVisitList from "@/lib/Hooks/Lists/UseVisitList.component";

function HomeVisitItem() {
  const ListVisit = useVisitList();

  return (
    <div className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white">
      <span>Visits</span>
      <span>{`${ListVisit?.filter((visit) => visit.income == true).length} / ${ListVisit?.filter((visit) => visit.income != true).length}`}</span>
    </div>
  );
}

export default HomeVisitItem;
