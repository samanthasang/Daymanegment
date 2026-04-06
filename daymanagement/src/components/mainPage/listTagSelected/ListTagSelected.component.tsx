"use client";
import { useAppSelector } from "@/lib/hook";
import useFilters from "@/lib/Hooks/useFilters";
import UseSearchParams from "@/lib/Hooks/UseSearchParams";
import { cn } from "@/lib/utils";
import { TTag } from "@/modules/tag/TagList.slice";

export const ListTagSelected = ({ tag }: { tag: string }) => {
  const { applyFilter } = useFilters();
  const { hasTagSearch, tagSearch } = UseSearchParams();
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

  const ChangeTag = () => {
    !hasTagSearch
      ? applyFilter("tag", tagSelected.id)
      : applyFilter("tag", false);
  };
  return (
    tagSelected && (
      <label
        className={cn(
          "cursor-pointer px-2 py-1 rounded-2xl",
          hasTagSearch && tagSearch == tagSelected.id
            ? "bg-card/15"
            : "bg-primary"
        )}
        onClick={(e) => {
          e && e.preventDefault();
          e && e.stopPropagation();
          ChangeTag();
        }}
      >
        {tagSelected.title || ""}
      </label>
    )
  );
};

export default ListTagSelected;
