"use client";
import FilterComponent from "@/components/Filter/FilterComponent";
import { useAppSelector } from "@/lib/hook";
import UseResetFilterComponent from "@/lib/Hooks/ResetFilter.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { Filter } from "lucide-react";

function SidebarFilter({ witDate = true }: { witDate?: boolean }) {
	const { OpenFilter } = useAppSelector((state) => state.Menu);
	const t: any = UseLangComponent("Menu");
	return (
		OpenFilter && (
			<div className="relative min-w-[320px] w-fit flex flex-col justify-start items-start h-full rounded-3xl p-0.5 gap-y-2">
				<div className="bg-secondary w-full flex justify-center items-center gap-x-2 py-2 rounded-full">
					<Filter width={18} height={18} />
					{t.filterTitle}
				</div>
				<FilterComponent witDate={witDate} />
				<UseResetFilterComponent fullButton />
			</div>
		)
	);
}

export default SidebarFilter;
