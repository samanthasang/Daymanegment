"use client"
import UseCategoryFilterComponent from "@/lib/Hooks/CategoryFilter.component";
import UseDateRangeComponent from "@/lib/Hooks/DateFilter.component";
import UseResetFilterComponent from "@/lib/Hooks/ResetFilter.component";
import UseTagFilterComponent from "@/lib/Hooks/TagFilter.component";

function FilterComponent() {
   
  return (
    <>
      <UseDateRangeComponent />
      <UseCategoryFilterComponent />
      <UseTagFilterComponent />
      <UseResetFilterComponent />
    </>
  );
}

export default FilterComponent;
