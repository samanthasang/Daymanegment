"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import TimerListActivities from "@/lib/Hooks/Lists/Timer/TimerListActivities.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
	() =>
		import("@/components/mainPage/SelectedSection/SelectedSection.component"),
	{ ssr: false },
);
function TimerListComponent() {
	const { ListTimerFiltered, ListTimerForgot, selectedTimer } = useTimerList();
	const { CompleteItem, DelItem, SelectItem } = TimerListActivities();
	const t: any = UseLangComponent("Timers");

	return (
		<>
			<ListSection
				drawerType="Timers"
				formType="Add"
				drawerTitle={t.single}
				selectedID={selectedTimer && !!selectedTimer.id}
				ListFilteredTilte={t.title}
				ListForgotTilte={t.forgotTilte}
				ListFilteredCount={FinishedArray(ListTimerFiltered).length}
				ListForgotCount={FinishedArray(ListTimerForgot).length}
				ListFiltered={ListTimerFiltered as []}
				ListForgot={ListTimerForgot as []}
				withpriority
				withFinish
				withComplateSort
			/>
			<SelectedSection
				drawerType="Timers"
				formType="Edit"
				drawerTitle={t.single}
				isComplete={(selectedTimer && selectedTimer.isComplete) || false}
				CompleteItem={() => CompleteItem(selectedTimer.id, selectedTimer.title)}
				DelItem={() => DelItem(selectedTimer.id, selectedTimer.title)}
				SelectItem={SelectItem}
				selected={selectedTimer}
			/>
		</>
	);
}
export default TimerListComponent;
