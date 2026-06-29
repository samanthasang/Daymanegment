"use client";
import IncomeFilter from "@/lib/Hooks/Filters/IncomeFilter.componen";
import IncomeMFilter from "@/lib/Hooks/Filters/IncomeMFilter.componen";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { CircleDollarSign } from "lucide-react";

function TodayInfoSpends() {
	const { ListSpendsToday } = useSpendsList();

	const { incomeArray: inComeArray } = IncomeFilter(ListSpendsToday);
	const { incomeMArray: outComeArray } = IncomeMFilter(ListSpendsToday);

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
	const SpendsToday = outComeArray
		.filter(
			(item) =>
				+item.doDate >= currentUnixTimestampZero &&
				+item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1),
		)
		.reduce((acc, obj) => {
			if (!obj.income && obj.priceOfProduct) {
				return acc + +obj.priceOfProduct;
			}
			return acc;
		}, 0);

	const t: any = UseLangComponent("Transactions");
	return (
		<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
			<span>{t.title}</span>
			<div
				dir="ltr"
				className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-1"
			>
				<div className="flex items-center gap-x-1 text-successGreen border-r border-blue-500 pr-1 mr-px">
					<CircleDollarSign width={16} height={16} />
					<label>{EarnToday}</label>
				</div>
				<div className="flex items-center gap-x-1 text-errorRed">
					<CircleDollarSign width={16} height={16} />
					<label>{SpendsToday}</label>
				</div>
			</div>
		</div>
	);
}

export default TodayInfoSpends;
