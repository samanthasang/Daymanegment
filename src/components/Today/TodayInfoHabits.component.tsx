"use client";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

function TodayInfoHabits() {
	const { ListHabbitToday } = UseHabbitList();

	const HabbitFinishLenght = NotFinishedArray(ListHabbitToday).length;
	const HabbitNotFinishLenght = FinishedArray(ListHabbitToday).length;

	const t: any = UseLangComponent("Habits");
	return (
		<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
			<span>{t.title}</span>
			<div
				dir="ltr"
				className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
			>
				<span className="text-successGreen border-r pr-1 mr-px border-blue-500">
					{HabbitFinishLenght}
				</span>
				<span className="text-errorRed">{HabbitNotFinishLenght}</span>
			</div>
		</div>
	);
}

export default TodayInfoHabits;
