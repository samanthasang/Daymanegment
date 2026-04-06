"use client";
import UseCategoryFilterComponent from "@/lib/Hooks/UseCategoryFilterComponent.component";
import UseDateRangeComponent from "@/lib/Hooks/UseDateRangeComponent.component";
import UseResetFilterComponent from "@/lib/Hooks/ResetFilter.component";
import UseTagFilterComponent from "@/lib/Hooks/UseTagFilterComponent.component";

function FilterComponent({ witDate }: { witDate: boolean }) {
  return (
    <>
      {witDate && <UseDateRangeComponent />}
      <UseCategoryFilterComponent />
      <UseTagFilterComponent />
      <UseResetFilterComponent />
    </>
  );
}

export default FilterComponent;
