"use client";
import { useAppSelector } from "@/lib/hook";
import useFilters from "@/lib/Hooks/useFilters";
import UseSearchParams from "@/lib/Hooks/UseSearchParams";
import { cn } from "@/lib/utils";
import { TCategory } from "@/modules/category/categoryList.slice";
import { Folder } from "lucide-react";

export const ListCategorySelected = ({ category }: { category?: string }) => {
  const { applyFilter } = useFilters();
  const { hasCategorySearch, categorySearch } = UseSearchParams();

  const {
    ListCategory,
  }: {
    ListCategory: TCategory[];
    selectedCategory: {};
  } = useAppSelector((state) => state.CategoryList) || [];

  const categorySelected =
    category && ListCategory
      ? ListCategory.filter((cat) => cat.id == category)[0]
      : {
          id: "",
          title: "",
        };

  const ChangeCategory = () => {
    !hasCategorySearch
      ? applyFilter("category", categorySelected.id)
      : applyFilter("category", false);
  };
  return (
    categorySelected && (
      <div
        className={cn(
          "cursor-pointer px-2 py-1 rounded-2xl hover:bg-card/15",
          hasCategorySearch && categorySearch == categorySelected.id
            ? "bg-card"
            : "bg-primary"
        )}
        onClick={(e) => {
          e && e.preventDefault();
          e && e.stopPropagation();
          ChangeCategory();
        }}
      >
        <div className="flex flex-row items-center gap-x-0.5">
          <Folder width={16} height={16} />
          {categorySelected.title || ""}
        </div>
      </div>
    )
  );
};

export default ListCategorySelected;
