"use client";
import { useAppSelector } from "@/lib/hook";
import { TPeople } from "@/modules/people/PeopleList.slice";
import { TShare } from "@/modules/share/share.slice";
import Link from "next/link";

function PeopleItem({ item }: { item: TPeople }) {
  const {
    ListShare,
  }: {
    ListShare: TShare[];
  } = useAppSelector((state) => state.ShareList) || {};

  const total = ListShare?.filter((share) => share.peopleId == item.id).reduce(
    (acc, obj) => {
      if (obj.income && obj.incomeAmount) {
        return acc + +obj.incomeAmount;
      }
      if (!obj.income && obj.outcomeAmount) {
        return acc - +obj.outcomeAmount;
      }
      return acc;
    },
    0
  );
  return (
    <Link
      href={`share/${item.id}`}
      className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white"
    >
      <span>{item.title}</span>
      <span
        className={`cursor-pointer px-4 py-1 rounded-2xl ${total > 0 ? "bg-green-500/15" : "bg-red-600/15"}`}
      >
        {total}
      </span>
    </Link>
  );
}

export default PeopleItem;
