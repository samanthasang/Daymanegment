"use client";
import { Button } from "@/components/ui/button";
import { CalendarOff, Folder, Tag } from "lucide-react";
import { cn } from "../utils";
import { DayUnixDiff } from "./UseDayJS";
import useFilters from "./useFilters";
import UseSearchParams from "./UseSearchParams";

function UseResetFilterComponent({
	fullButton = false,
}: {
	fullButton?: boolean;
}) {
	const { applyFilter } = useFilters();

	const { hasdateFrom, dateFrom, hasdateTo, hasCategorySearch, hasTagSearch } =
		UseSearchParams();

	const handleCatFilter = () => {
		applyFilter("category", "");
	};
	const handleTagFilter = () => {
		applyFilter("tag", "");
	};

	const handleStartDateFilter = () => {
		applyFilter("dateFrom", "");
	};
	const handleEndDateFilter = () => {
		applyFilter("dateTo", "");
	};

	return (
		<div
			dir="ltr"
			className={cn(
				"flex justify-around w-full items-center gap-x-1 bg-secondary p-1.5 gap-y-2 rounded-3xl",
				fullButton ? "w-full" : "w-fit",
			)}
		>
			<Button
				onClick={(e) => {
					e && e.preventDefault();
					hasdateFrom &&
						dateFrom &&
						DayUnixDiff(+dateFrom, "day") != 0 &&
						handleStartDateFilter();
				}}
				className={cn(
					"rounded-none rounded-l-3xl",
					dateFrom && DayUnixDiff(+dateFrom, "day") != 0
						? "bg-button"
						: "bg-primary",
					fullButton && "flex-1",
				)}
			>
				<CalendarOff
					className={
						dateFrom && DayUnixDiff(+dateFrom, "day") != 0
							? "fill-red-500"
							: "bg-transparent"
					}
				/>
			</Button>
			<Button
				onClick={(e) => {
					e && e.preventDefault();
					hasdateTo && handleEndDateFilter();
				}}
				className={cn(
					"rounded-none rounded-r-3xl",
					hasdateTo ? "bg-button" : "bg-primary",
					fullButton && "flex-1",
				)}
			>
				<CalendarOff
					className={hasdateTo ? "fill-red-500" : "bg-transparent"}
				/>
			</Button>
			<Button
				onClick={(e) => {
					e && e.preventDefault();
					hasCategorySearch && handleCatFilter();
				}}
				className={cn(
					hasCategorySearch ? "bg-button" : "bg-primary",
					fullButton && "flex-1",
				)}
			>
				<Folder
					className={hasCategorySearch ? "fill-red-500" : "bg-transparent"}
				/>
			</Button>
			<Button
				onClick={(e) => {
					e && e.preventDefault();
					hasTagSearch && handleTagFilter();
				}}
				className={cn(
					hasTagSearch ? "bg-button" : "bg-primary",
					fullButton && "flex-1",
				)}
			>
				<Tag className={hasTagSearch ? "fill-red-500" : "bg-transparent"} />
			</Button>
		</div>
	);
}
export default UseResetFilterComponent;
