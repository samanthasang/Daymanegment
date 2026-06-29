"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import IncomeFilter from "@/lib/Hooks/Filters/IncomeFilter.componen";
import IncomeMFilter from "@/lib/Hooks/Filters/IncomeMFilter.componen";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import useReminderList from "@/lib/Hooks/Lists/Reminder/UseReminderList.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { cn } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";
import TodayInfoTodos from "./TodayInfoTodos.component";
import TodayInfoSpends from "./TodayInfoSpends.component";
import TodayInfoHabits from "./TodayInfoHabits.component";
import TodayInfoGoals from "./TodayInfoGoals.componen";
import TodayInfoVisits from "./TodayInfoVisits.componen";
import TodayInfoInstallments from "./TodayInfoInstallments.componen";
import TodayInfoReminders from "./TodayInfoReminders.componen";
import TodayInfoTimers from "./TodayInfoTimers.componen";
import TodayInfoShares from "./TodayInfoShares.component";
import TodayInfoFriends from "./TodayInfoFriends.componen";

function TodayInfo() {
	const { ListGoalsToday } = useGoalsList();
	const { ListHabbitToday } = UseHabbitList();
	const { ListTimerFiltered } = useTimerList();
	const { ListReminderToday } = useReminderList();
	const { ListVisitToday, selectedVisit } = useVisitList();
	const { ListInstallmentsToday } = useInstallmentsList();
	const { ListSharesToday } = useShareList();

	const SharesLenght = ListSharesToday.length;
	const { incomeArray: inComeArray } = IncomeFilter(ListSharesToday);
	const { incomeMArray: outComeArray } = IncomeMFilter(ListSharesToday);
	const SharesIncomeArray = inComeArray?.reduce((acc, obj) => {
		if (obj.income && obj.incomeAmount) {
			return acc + +obj.incomeAmount;
		}
		return acc;
	}, 0);
	const SharesOutcomeArray = outComeArray?.reduce((acc, obj) => {
		if (!obj.income && obj.outcomeAmount) {
			return acc + +obj.outcomeAmount;
		}
		return acc;
	}, 0);

	const OldSharesLenght = ListSharesToday.length;
	const { incomeArray } = IncomeFilter(ListSharesToday);
	const { incomeMArray: outcomeArray } = IncomeMFilter(ListSharesToday);
	const OldSharesInComeArray = incomeArray?.reduce((acc, obj) => {
		if (obj.income && obj.incomeAmount) {
			return acc + +obj.incomeAmount;
		}
		return acc;
	}, 0);
	const OldSharesOutComeArray = outcomeArray?.reduce((acc, obj) => {
		if (!obj.income && obj.outcomeAmount) {
			return acc + +obj.outcomeAmount;
		}
		return acc;
	}, 0);

	const EarnToday = inComeArray
		.filter(
			(item) =>
				+item.doDate >= currentUnixTimestampZero &&
				+item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1),
		)
		.reduce((acc, obj) => {
			if (obj.income && obj.incomeAmount) {
				return acc + +obj.incomeAmount;
			}
			return acc;
		}, 0);
	const SharesToday = outComeArray
		.filter(
			(item) =>
				+item.doDate >= currentUnixTimestampZero &&
				+item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1),
		)
		.reduce((acc, obj) => {
			if (!obj.income && obj.outcomeAmount) {
				return acc + +obj.outcomeAmount;
			}
			return acc;
		}, 0);

	const t: any = UseLangComponent("Drawer");
	return (
		<div className="w-full min-w-96 flex flex-col gap-y-2">
			<TodayInfoTodos />

			<TodayInfoGoals />

			<TodayInfoHabits />

			<TodayInfoTimers />

			<TodayInfoReminders />

			<TodayInfoInstallments />

			<TodayInfoVisits />

      <TodayInfoSpends />
      
			<TodayInfoFriends />

			<TodayInfoShares />
		</div>
	);
}

export default TodayInfo;
