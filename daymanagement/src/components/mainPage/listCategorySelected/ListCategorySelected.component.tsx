"use client";
import { useAppSelector } from "@/lib/hook";
import { TCategory } from "@/modules/category/categoryList.slice";
export const ListCategorySelected = ({ category }: { category: string }) => {
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

  return (
    categorySelected && (
      <label className={`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`}>
        {categorySelected.title || ""}
      </label>
    )
  );
};

export default ListCategorySelected;
