"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { useState } from "react";

function GoalsInfo() {
	const [forgot, setForgot] = useState(false);
	const { ListGoalsFiltered, ListGoalsForgot, ListGoalsAll } = useGoalsList();

	const GoalsLenght = ListGoalsFiltered.length;
	const GoalsFinishLenght = NotFinishedArray(ListGoalsFiltered).length;
	const GoalsNotFinishLenght = FinishedArray(ListGoalsFiltered).length;
	const GoalsTodayLenght = ListGoalsAll.filter(
		(item) =>
			item.doDate >= currentUnixTimestampZero &&
			item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1),
	);

	const TodayGoalsFinishLenght = NotFinishedArray(GoalsTodayLenght).length;
	const TodayGoalsNotFinishLenght = FinishedArray(GoalsTodayLenght).length;

	const OldGoalsLenght = ListGoalsForgot.length;
	const OldGoalsFinishLenght = NotFinishedArray(ListGoalsForgot).length;
	const OldGoalsNotFinishLenght = FinishedArray(ListGoalsForgot).length;

	const tGoals: any = UseLangComponent("Goals");
	const t: any = UseLangComponent("Drawer");
	return (
		<div className="w-full min-w-96 flex flex-col gap-y-2">
			<ListTitleContainer>
				<ListTitle
					forgot={!forgot}
					setForgot={() => setForgot(false)}
					title={tGoals.title}
				/>
				<ListTitle
					forgot={forgot}
					setForgot={() => setForgot(true)}
					title={tGoals.forgotTilte}
				/>
			</ListTitleContainer>
			<div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
				<span>{t.AllGoals}</span>
				{!forgot ? GoalsLenght : OldGoalsLenght}
			</div>
			<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
				<span>{t.DoneStatus}</span>
				<div
					dir="ltr"
					className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
				>
					<span className="text-successGreen border-r pr-1 mr-px border-blue-500">
						{!forgot ? GoalsFinishLenght : OldGoalsFinishLenght}{" "}
					</span>
					<span className="text-errorRed">
						{!forgot ? GoalsNotFinishLenght : OldGoalsNotFinishLenght}
					</span>
				</div>
			</div>
			<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
				<span>{t.TodayGoals}</span>
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
		</div>
	);
}

export default GoalsInfo;
