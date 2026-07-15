"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import VisitListActivities from "@/lib/Hooks/Lists/Visit/VisitListActivities.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
	() =>
		import("@/components/mainPage/SelectedSection/SelectedSection.component"),
	{ ssr: false },
);

function VisitListComponent() {
	const { ListVisitFiltered, ListVisitForgot, selectedVisit } = useVisitList();
	const {
		CompleteItem,
		DelItem,
		SelectItem,
		BringTodayItem,
		DuplicateTodayItem,
		AddDayToItem,
		PaymentCompleteItem,
	} = VisitListActivities();
	const t: any = UseLangComponent("Visits");

	return (
		<>
			<ListSection
				drawerType="Visits"
				formType="Add"
				drawerTitle={t.single}
				selectedID={selectedVisit && !!selectedVisit.id}
				ListFilteredTilte={t.title}
				ListForgotTilte={t.forgotTilte}
				ListFilteredCount={FinishedArray(ListVisitFiltered).length}
				ListForgotCount={FinishedArray(ListVisitForgot).length}
				ListFiltered={ListVisitFiltered as []}
				ListForgot={ListVisitForgot as []}
				withFinish
				withComplateSort
			/>
			<SelectedSection
				drawerType="Visits"
				formType="Edit"
				drawerTitle={t.single}
				isComplete={(selectedVisit && selectedVisit.isComplete) || false}
				CompleteItem={() => CompleteItem(selectedVisit.id, selectedVisit.title)}
				UndoneItem={() => CompleteItem(selectedVisit.id, selectedVisit.title)}
				DelItem={() => DelItem(selectedVisit.id, selectedVisit.title)}
				SelectItem={() => SelectItem()}
				BringTodayItem={() => BringTodayItem({ ...selectedVisit })}
				DuplicateTodayItem={() => DuplicateTodayItem({ ...selectedVisit })}
				AddOneDayToItem={() => AddDayToItem({ ...selectedVisit }, 1)}
				AddSevenDaysToItem={() => AddDayToItem({ ...selectedVisit }, 7)}
				PaymentCompleteItem={() => PaymentCompleteItem({ ...selectedVisit })}
				selected={selectedVisit}
			/>
		</>
	);
}

export default VisitListComponent;
