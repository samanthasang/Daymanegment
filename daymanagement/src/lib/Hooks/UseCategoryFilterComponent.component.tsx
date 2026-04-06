"use client";
import CategotySelectComponent from "@/components/Category/CategotySelect.component";
import { useEffect, useState } from "react";
import useFilters from "./useFilters";
import UseSearchParams from "./UseSearchParams";

function UseCategoryFilterComponent() {
  const { applyFilter } = useFilters();
  const { categorySearch, hasCategorySearch } = UseSearchParams();

  const [category, setCategory] = useState<string | undefined>("");

  useEffect(() => {
    category
      ? applyFilter("category", category)
      : applyFilter("category", false);
  }, [category]);

  useEffect(() => {
    hasCategorySearch
      ? categorySearch &&
        category != categorySearch &&
        setCategory(categorySearch)
      : setCategory("");
  }, [hasCategorySearch]);

  const handleCategorySelect = (category: string) => {
    setCategory(category);
  };

  return (
    <CategotySelectComponent
      onValueChange={handleCategorySelect}
      value={category}
    />
  );
}
export default UseCategoryFilterComponent;
