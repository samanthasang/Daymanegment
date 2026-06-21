"use client";
import UseCategoryFilterComponent from "@/lib/Hooks/UseCategoryFilterComponent.component";
import UseDateRangeComponent from "@/lib/Hooks/UseDateRangeComponent.component";
import UseTagFilterComponent from "@/lib/Hooks/UseTagFilterComponent.component";

function FilterComponent({ witDate }: { witDate: boolean }) {
	return (
		<div className="bg-secondary w-full flex flex-col justify-start items-start h-full flex-1 rounded-2xl p-1.5 gap-y-0.5">
			{witDate && <UseDateRangeComponent />}
			<UseCategoryFilterComponent />
			<UseTagFilterComponent />
		</div>
	);
}

export default FilterComponent;
