"use client";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

function TodayInfoGoals() {
	const { ListGoalsToday } = useGoalsList();

	const TodayGoalsFinishLenght = NotFinishedArray(ListGoalsToday).length;
	const TodayGoalsNotFinishLenght = FinishedArray(ListGoalsToday).length;

	const t: any = UseLangComponent("Goals");
	return (
		<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
			<span>{t.title}</span>
			<div
				dir="ltr"
				className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
			>
				<span className="text-successGreen border-r pr-1 mr-px border-blue-500">
					{TodayGoalsFinishLenght}
				</span>
				<span className="text-errorRed">{TodayGoalsNotFinishLenght}</span>
			</div>
		</div>
	);
}

export default TodayInfoGoals;
