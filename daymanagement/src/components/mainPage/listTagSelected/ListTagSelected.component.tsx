"use client";
import { useAppSelector } from "@/lib/hook";
import { TTag } from "@/modules/tag/TagList.slice";

export const ListTagSelected = ({ tag }: { tag: string }) => {
  const {
    ListTag,
  }: {
    ListTag: TTag[];
    selectedTag: {};
  } = useAppSelector((state) => state.TagList) || [];

  const tagSelected = ListTag
    ? ListTag.filter((t) => t.id == tag)[0]
    : {
        id: "",
        title: "",
      };

  return (
    tagSelected && (
      <label className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}>
        {tagSelected.title || ""}
      </label>
    )
  );
};

export default ListTagSelected;
