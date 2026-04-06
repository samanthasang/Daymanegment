"use client";
import { useAppSelector } from "@/lib/hook";
import useFilters from "@/lib/Hooks/useFilters";
import UseSearchParams from "@/lib/Hooks/UseSearchParams";
import { cn } from "@/lib/utils";
import { TCategory } from "@/modules/category/categoryList.slice";

export const ListCategorySelected = ({ category }: { category: string }) => {
  const { applyFilter } = useFilters();
  const { hasCategorySearch, categorySearch } = UseSearchParams();

  const {
    ListCategory,
  }: {
    ListCategory: TCategory[];
    selectedCategory: {};
  } = useAppSelector((state) => state.CategoryList) || [];

  const categorySelected = ListCategory
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
      <label
        className={cn(
          "cursor-pointer px-2 py-1 rounded-2xl",
          hasCategorySearch && categorySearch == categorySelected.id
            ? "bg-card/15"
            : "bg-primary"
        )}
        onClick={(e) => {
          e && e.preventDefault();
          e && e.stopPropagation();
          ChangeCategory();
        }}
      >
        {categorySelected.title || ""}
      </label>
    )
  );
};

export default ListCategorySelected;
