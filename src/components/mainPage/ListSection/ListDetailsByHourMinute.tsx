// ListDetailsByHourMinute.tsx
import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ListDetailsItem from "./ListDetailsItem.component";

dayjs.extend(utc);

function ListDetailsByHourMinute({
	drawerType,
	List,
}: {
	drawerType: string;
	List: [];
}) {
	const grouped = useMemo(() => {
		const groups: Record<string, any[]> = {};

		List.forEach((item: any) => {
			const timestamp = Number(
				item.birthDate || item.doDate || item.lastUpdate || item.startDate,
			);

			if (!timestamp || isNaN(timestamp)) return;

			// Group by hour and minute (e.g., "14:30")
			const date = dayjs.unix(timestamp);
			const hourKey = date.startOf("minute").unix().toString();

			if (!groups[hourKey]) {
				groups[hourKey] = [];
			}
			groups[hourKey].push(item);
		});

		return groups;
	}, [List]);

	const sortedHours = Object.keys(grouped).sort((a, b) => {
		return Number(a) - Number(b);
	});

	return sortedHours.map((hour) => {
		const displayTime = dayjs.unix(Number(hour)).format("h:mm A");

		return (
			<section key={hour}>
				<div className="flex flex-col w-full justify-center items-center bg-secondary rounded-3xl mb-2">
					<div className="flex-1 h-px bg-white" />
					<h2 className="text-center whitespace-nowrap">{displayTime}</h2>
					<div className="flex-1 h-px bg-white" />
				</div>
				<ul className="flex-1 w-full flex flex-col gap-y-1">
					<ListDetailsItem drawerType={drawerType} List={grouped[hour] as []} />
				</ul>
			</section>
		);
	});
}

export default ListDetailsByHourMinute;
