"use client";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

function TodayInfoInstallments() {
	const { ListInstallmentsToday } = useInstallmentsList();

	const TodayInstallmentsFinishLenght = NotFinishedArray(
		ListInstallmentsToday,
	).length;
	const TodayInstallmentsNotFinishLenght = FinishedArray(
		ListInstallmentsToday,
	).length;

	const t: any = UseLangComponent("Installments");
	return (
		<div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
			<span>{t.title}</span>
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
	);
}

export default TodayInfoInstallments;
