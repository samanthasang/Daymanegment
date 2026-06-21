import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ListDetailsItem from "./ListDetailsItem.component";
import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";

// Extend dayjs with UTC plugin for consistent timezone handling
dayjs.extend(utc);

function ListDetails({ drawerType, List }: { drawerType: string; List: [] }) {
	const grouped = useMemo<any>(() => {
		return List.reduce((acc: any, item: any) => {
			// Get the timestamp (already in seconds)
			const timestamp = Number(
				item.birthDate || item.doDate || item.lastUpdate || item.startDate,
			);

			// Skip invalid timestamps
			if (!timestamp || isNaN(timestamp)) {
				return acc;
			}

			// Use day.js to convert Unix seconds to a date
			// dayjs.unix() takes seconds (not milliseconds)
			const date = dayjs.unix(timestamp / 1000);

			// Get YYYY-MM-DD format for grouping
			const dayKey = +timestamp;

			if (!acc[dayKey]) {
				acc[dayKey] = [];
			}
			acc[dayKey].push(item);
			return acc;
		}, {});
	}, [List]);

	// Sort dates using day.js
	const sortedDays = Object.keys(grouped).sort((a, b) => {
		// Parse the YYYY-MM-DD strings with dayjs
		const dayA = dayjs(a);
		const dayB = dayjs(b);
		return dayA.unix() - dayB.unix(); // Oldest first
	});

	console.log(sortedDays);

	return sortedDays.map((day) => (
		<section key={day}>
			<div className="flex flex-col w-full justify-center items-center bg-secondary rounded-3xl mb-2">
				<div className="flex-1 h-px bg-white" />
				<h2 className="text-center whitespace-nowrap">
					{DayUnixFormat(+day, "dddd, MMMM D, YYYY")}
				</h2>
				<div className="flex-1 h-px bg-white" />
			</div>
			<ul className="flex-1 w-full flex flex-col gap-y-1">
				<ListDetailsItem drawerType={drawerType} List={grouped[day]} />
			</ul>
		</section>
	));
}

export default ListDetails;
