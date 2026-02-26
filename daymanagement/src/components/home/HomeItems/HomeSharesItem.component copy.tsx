"use client";
import { useAppSelector } from "@/lib/hook";
import Link from "next/link";

function HomeShareItem() {
  const { ListShare }: any =
    useAppSelector((state) => state.ShareList) || {};
  return (
    <Link
      href={"/share"}
      className="w-full h-fit aspect-square cursor-pointer flex flex-col items-center justify-center border p-3 rounded-2xl border-white"
    >
      <span>Shares</span>
      <span>{`${ListShare && ListShare.length}`}</span>
    </Link>
  );
}

export default HomeShareItem;
