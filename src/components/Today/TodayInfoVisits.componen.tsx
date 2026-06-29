"use client";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

function TodayInfoVisits() {
	const { ListVisitToday } = useVisitList();

	const TodayVisitsFinishLenght = NotFinishedArray(ListVisitToday).length;
	const TodayVisitsNotFinishLenght = FinishedArray(ListVisitToday).length;

	const t: any = UseLangComponent("Visits");
	return (
		<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
			<span>{t.title}</span>
			<div
				dir="ltr"
				className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
			>
				<span className="text-successGreen border-r pr-1 mr-px border-blue-500">
					{TodayVisitsFinishLenght}
				</span>
				<span className="text-errorRed">{TodayVisitsNotFinishLenght}</span>
			</div>
		</div>
	);
}

export default TodayInfoVisits;
