"use client";
import useSpendsList from "@/lib/Hooks/Lists/UseSpendsList.component";

function HomeSpendsItem() {
  const ListSpends = useSpendsList();

  return (
    <div className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white">
      <span>Spends</span>
      <span>{`${ListSpends?.filter((spends) => spends.income == true).length} / ${ListSpends?.filter((spends) => spends.income != true).length}`}</span>
    </div>
  );
}

export default HomeSpendsItem;
