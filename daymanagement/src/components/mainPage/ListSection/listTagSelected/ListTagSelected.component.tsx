"use client";
import { useAppSelector } from "@/lib/hook";
import useFilters from "@/lib/Hooks/useFilters";
import UseSearchParams from "@/lib/Hooks/UseSearchParams";
import { cn } from "@/lib/utils";
import { TTag } from "@/modules/tag/TagList.slice";
import { Tag } from "lucide-react";

export const ListTagSelected = ({ tag }: { tag?: string }) => {
  const { applyFilter } = useFilters();
  const { hasTagSearch, tagSearch } = UseSearchParams();
  const {
    ListTag,
  }: {
    ListTag: TTag[];
    selectedTag: {};
  } = useAppSelector((state) => state.TagList) || [];

  const tagSelected =
    tag && ListTag
      ? ListTag.filter((t) => t.id == tag)[0]
      : {
          id: "",
          title: "",
        };

  const ChangeTag = () => {
    !hasTagSearch
      ? applyFilter("tag", tagSelected.id)
      : applyFilter("tag", false);
  };
  return (
    tagSelected && (
      <div
        className={cn(
          "cursor-pointer px-2 py-1 rounded-2xl hover:bg-card/15",
          hasTagSearch && tagSearch == tagSelected.id ? "bg-card" : "bg-primary"
        )}
        onClick={(e) => {
          e && e.preventDefault();
          e && e.stopPropagation();
          ChangeTag();
        }}
      >
        <div className="flex flex-row items-center gap-x-0.5">
          <Tag width={16} height={16} />
          {tagSelected.title || ""}
        </div>
      </div>
    )
  );
};

export default ListTagSelected;
