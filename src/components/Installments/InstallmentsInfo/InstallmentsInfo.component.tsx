"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { useState } from "react";

function InstallmentsInfo() {
	const [forgot, setForgot] = useState(false);
	const {
		ListInstallmentsFiltered,
		ListInstallmentsForgot,
		ListInstallmentsAll,
	} = useInstallmentsList();

	const InstallmentsLenght = ListInstallmentsFiltered.length;
	const InstallmentsFinishLenght = NotFinishedArray(
		ListInstallmentsFiltered,
	).length;
	const InstallmentsNotFinishLenght = FinishedArray(
		ListInstallmentsFiltered,
	).length;
	const InstallmentsTodayLenght = ListInstallmentsAll.filter(
		(item) =>
			item.doDate >= currentUnixTimestampZero &&
			item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1),
	);
	const InstallmentsTenDayLenght = ListInstallmentsAll.filter(
		(item) =>
			item.doDate >= currentUnixTimestampZero &&
			item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 10),
	).length;

	const TodayInstallmentsFinishLenght = NotFinishedArray(
		InstallmentsTodayLenght,
	).length;
	const TodayInstallmentsNotFinishLenght = FinishedArray(
		InstallmentsTodayLenght,
	).length;

	const OldInstallmentsLenght = ListInstallmentsForgot.length;
	const OldInstallmentsFinishLenght = NotFinishedArray(
		ListInstallmentsForgot,
	).length;
	const OldInstallmentsNotFinishLenght = FinishedArray(
		ListInstallmentsForgot,
	).length;

	const tInstallments: any = UseLangComponent("Installments");
	const t: any = UseLangComponent("Drawer");
	return (
		<div className="w-full min-w-96 flex flex-col gap-y-2">
			<ListTitleContainer>
				<ListTitle
					forgot={!forgot}
					setForgot={() => setForgot(false)}
					title={tInstallments.title}
				/>
				<ListTitle
					forgot={forgot}
					setForgot={() => setForgot(true)}
					title={tInstallments.forgotTilte}
				/>
			</ListTitleContainer>
			<div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
				<span>{t.AllInstallments}</span>
				{!forgot ? InstallmentsLenght : OldInstallmentsLenght}
			</div>
			<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
				<span>{t.DoneStatus}</span>
				<div
					dir="ltr"
					className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
				>
					<span className="text-successGreen border-r pr-1 mr-px border-blue-500">
						{!forgot ? InstallmentsFinishLenght : OldInstallmentsFinishLenght}
					</span>
					<span className="text-errorRed">
						{!forgot
							? InstallmentsNotFinishLenght
							: OldInstallmentsNotFinishLenght}
					</span>
				</div>
			</div>
			<div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
				<span>{t.TenDaysReminders}</span>
				{InstallmentsTenDayLenght}
			</div>
			<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
				<span>{t.TodayInstallments}</span>
				<div
					dir="ltr"
					className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5"
				>
					<span className="text-successGreen border-r pr-1 mr-px border-blue-500">
						{TodayInstallmentsFinishLenght}
					</span>
					<span className="text-errorRed">
						{TodayInstallmentsNotFinishLenght}
					</span>
				</div>
			</div>
		</div>
	);
}

export default InstallmentsInfo;
