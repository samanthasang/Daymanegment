import { useMemo } from "react";
import ListDetailsItem from "./ListDetailsItem.component";

function ListDetails({ drawerType, List }: { drawerType: string; List: [] }) {
	const grouped = useMemo<any>(() => {
		return List.reduce((acc: any, item: any) => {
			// Convert Unix seconds to milliseconds
			const date = new Date(
				Number(
					item.birthDate || item.doDate || item.lastUpdate || item.startDate,
				) * 1000,
			);

			// Use YYYY-MM-DD for stable sorting/keying
			const dayKey = date.toISOString().split("T")[0];

			if (!acc[dayKey]) {
				acc[dayKey] = [];
			}
			acc[dayKey].push(item);
			return acc;
		}, {});
	}, [List]);

	// Sort dates so the oldest/newest appear correctly
	const sortedDays = Object.keys(grouped).sort(
		(a, b) => new Date(a).getTime() - new Date(b).getTime(),
	);

	return sortedDays.map((day) => (
		<section key={day}>
			<div className="flex flex-col w-full justify-center items-center bg-secondary rounded-3xl mb-2">
				<div className="flex-1 h-px bg-white" />
				<h2 className="text-center whitespace-nowrap">
					{new Date(day).toDateString()}
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
