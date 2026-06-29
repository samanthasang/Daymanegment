"use client";
import usePeopleList from "@/lib/Hooks/Lists/Friends/UsePeopleList.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { CircleDollarSign } from "lucide-react";

function TodayInfoFriends() {
	const { listHasShare } = usePeopleList();
	const { ListSharesToday } = useShareList();

	const incomeAmount = listHasShare
		.map(
			(people) =>
				ListSharesToday &&
				ListSharesToday?.filter(
					(share) =>
						people &&
						people.shareList &&
						people.shareList.length > 0 &&
						people.shareList.includes(share.id),
				).reduce((acc, obj) => {
					if (obj.income && obj.incomeAmount) {
						return acc + +obj.incomeAmount;
					}
					return acc;
				}, 0),
		)
		.reduce((acc, obj) => {
			if (obj > 0) {
				return acc + +obj;
			}
			return acc;
		}, 0);

	const outcomeAmount = listHasShare
		.map(
			(people) =>
				ListSharesToday &&
				ListSharesToday?.filter((share) =>
					people.shareList.includes(share.id),
				).reduce((acc, obj) => {
					if (!obj.income && obj.outcomeAmount) {
						return acc - +obj.outcomeAmount;
					}
					return acc;
				}, 0),
		)
		.reduce((acc, obj) => {
			if (obj < 0) {
				return acc - +obj;
			}
			return acc;
		}, 0);

	const t: any = UseLangComponent("Friends");
	return (
		<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
			<span>{t.title}</span>
			<div
				dir="ltr"
				className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-1"
			>
				<div className="flex items-center gap-x-1 text-successGreen border-r border-blue-500 pr-1 mr-px">
					<CircleDollarSign width={16} height={16} />
					<label>{incomeAmount}</label>
				</div>
				<div className="flex items-center gap-x-1 text-errorRed">
					<CircleDollarSign width={16} height={16} />
					<label>{outcomeAmount}</label>
				</div>
			</div>
		</div>
	);
}

export default TodayInfoFriends;
