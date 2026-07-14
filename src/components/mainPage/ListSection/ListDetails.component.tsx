// ListDetailsByDay.tsx
import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ListDetailsItem from "./ListDetailsItem.component";
import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import { useAppSelector } from "@/lib/hook";
import AnimatedList from "@/components/ui/AnimatedList";

dayjs.extend(utc);

function ListDetailsByDay({
	drawerType,
	List,
}: {
	drawerType: string;
	List: [];
}) {
	const { lang } = useAppSelector((state) => state.Menu) || { lang: "en" };

	const grouped = useMemo(() => {
		const groups: Record<string, any[]> = {};

		List.forEach((item: any) => {
			const timestamp = Number(
				item.birthDate || item.doDate || item.lastUpdate || item.startDate,
			);

			if (!timestamp || isNaN(timestamp)) return;

			// Use dayjs.unix() with seconds (timestamp is already in seconds)
			const date = dayjs.unix(timestamp);

			// Get start of day (midnight) as Unix timestamp
			const dayKey = date.startOf("day").unix().toString();

			if (!groups[dayKey]) {
				groups[dayKey] = [];
			}
			groups[dayKey].push(item);
		});

		return groups;
	}, [List]);

	const sortedDays = Object.keys(grouped).sort((a, b) => {
		return Number(a) - Number(b);
	});

	return sortedDays.map((day) => (
		<section key={day}>
			<div className="flex flex-col w-full justify-center items-center bg-secondary rounded-3xl mb-2">
				<div className="flex-1 h-px bg-white" />
				<h2 className="text-center whitespace-nowrap">
					{DayUnixFormat(+day, "dddd, MMMM D, YYYY", lang)}
				</h2>
				<div className="flex-1 h-px bg-white" />
			</div>
			{/* <ul className="flex-1 w-full flex flex-col gap-y-1">
				<ListDetailsItem drawerType={drawerType} List={grouped[day] as []} />
			</ul> */}
			{/* <ul className="flex-1 w-full flex flex-col gap-y-1">
					<ListDetailsItem drawerType={drawerType} List={grouped[hour] as []} />
				</ul> */}
			<AnimatedList
				items={grouped[day] as []}
				onItemSelect={(item, index) => console.log(item, index)}
				enableArrowNavigation
				displayScrollbar
				drawerType={drawerType}
			/>
		</section>
	));
}

export default ListDetailsByDay;
