"use client";
import useSpendsList from "@/lib/Hooks/Lists/UseSpendsList.component";
import Link from "next/link";

function HomeSpendsItem() {
  const ListSpends = useSpendsList();

  return (
    <Link
      href={"/spends"}
      className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white"
    >
      <span>Spends</span>
      <span>{`${ListSpends?.filter((spends) => spends.income == true).length} / ${ListSpends?.filter((spends) => spends.income != true).length}`}</span>
    </Link>
  );
}

export default HomeSpendsItem;
