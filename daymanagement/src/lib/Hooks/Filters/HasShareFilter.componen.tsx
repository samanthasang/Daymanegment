"use client";
import { TShare } from "@/modules/share/share.slice";
import { useAppSelector } from "../../hook";

function HasShareFilter(id: string) {
  const {
    ListShare,
  }: {
    ListShare: TShare[];
    selectedShare: {};
  } = useAppSelector((state) => state.ShareList) || [];

  const hasShareArray =
    ListShare && ListShare.filter((share) => share.peopleId == id).length;

  return hasShareArray;
}

export default HasShareFilter;
