"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import { useAppDispatch } from "@/lib/hook";
import usePeopleList from "@/lib/Hooks/Lists/Friends/UsePeopleList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { selectPeopleList } from "@/modules/people/PeopleList.slice";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
	() =>
		import("@/components/mainPage/SelectedSection/SelectedSection.component"),
	{ ssr: false },
);

function FriendsListComponent() {
	const dispatch = useAppDispatch();
	const { listHasNoShare, listHasShare, selectedPeople } = usePeopleList();
	const t: any = UseLangComponent("Friends");

	const SelectItem = () => {
		dispatch(selectPeopleList(""));
	};

	return (
		<>
			<ListSection
				drawerType="Friends"
				formType="Add"
				drawerTitle={t.single}
				selectedID={selectedPeople && !!selectedPeople.id}
				ListFilteredTilte={t.title}
				ListForgotTilte={t.forgotTilte}
				ListFilteredCount={listHasShare.length}
				ListForgotCount={listHasNoShare.length}
				ListFiltered={listHasShare as []}
				ListForgot={listHasNoShare as []}
			/>
			<SelectedSection
				drawerType="Friends"
				formType="Edit"
				drawerTitle={t.single}
				SelectItem={SelectItem}
				selected={selectedPeople}
			/>
		</>
	);
}

export default FriendsListComponent;
