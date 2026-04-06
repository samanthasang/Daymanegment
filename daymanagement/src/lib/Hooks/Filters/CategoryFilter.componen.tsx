"use client";
import { useMemo } from "react";
import UseSearchParams from "../UseSearchParams";

function CategoryFilter(List: any[]) {
  const { categorySearch, hasCategorySearch } = UseSearchParams();

  const categoryArray = useMemo(
    () =>
      hasCategorySearch && !!categorySearch
        ? List?.filter((a) => a.category == categorySearch)
        : List,

    [hasCategorySearch, List, categorySearch]
  );

  return categoryArray;
}

export default CategoryFilter;
