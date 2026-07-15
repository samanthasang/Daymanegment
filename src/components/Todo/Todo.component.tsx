"use client";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import TodoListActivities from "@/lib/Hooks/Lists/Todo/TodoListActivities.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import dynamic from "next/dynamic";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import ListSection from "../mainPage/ListSection/ListSection.component";

const SelectedSection = dynamic(
	() =>
		import("@/components/mainPage/SelectedSection/SelectedSection.component"),
	{ ssr: false },
);

function TodoListComponent() {
	const { ListToDoFiltered, ListToDoForgot, selectedToDo } = useTodoList();
	const {
		CompleteItem,
		DelItem,
		SelectItem,
		BringTodayItem,
		DuplicateTodayItem,
		AddDayToItem,
	} = TodoListActivities();
	const t: any = UseLangComponent("Todos");

	return (
		<>
			<ListSection
				drawerType="Todos"
				formType="Add"
				drawerTitle={t.single}
				selectedID={selectedToDo && !!selectedToDo.id}
				ListFilteredTilte={t.title}
				ListForgotTilte={t.forgotTilte}
				ListFilteredCount={FinishedArray(ListToDoFiltered).length}
				ListForgotCount={FinishedArray(ListToDoForgot).length}
				ListFiltered={ListToDoFiltered as []}
				ListForgot={ListToDoForgot as []}
				withpriority
				withFinish
				withComplateSort
			/>
			<SelectedSection
				drawerType="Todos"
				formType="Edit"
				drawerTitle={t.single}
				CompleteItem={() => CompleteItem(selectedToDo.id, selectedToDo.title)}
				UndoneItem={() => CompleteItem(selectedToDo.id, selectedToDo.title)}
				DelItem={() => DelItem(selectedToDo.id, selectedToDo.title)}
				SelectItem={() => SelectItem()}
				BringTodayItem={() => BringTodayItem({ ...selectedToDo })}
				DuplicateTodayItem={() => DuplicateTodayItem({ ...selectedToDo })}
				AddOneDayToItem={() => AddDayToItem({ ...selectedToDo }, 1)}
				AddSevenDaysToItem={() => AddDayToItem({ ...selectedToDo }, 7)}
				selected={selectedToDo}
			/>
		</>
	);
}

export default TodoListComponent;
