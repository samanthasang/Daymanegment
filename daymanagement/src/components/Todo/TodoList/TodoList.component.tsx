"use client";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import TodoListActivities from "@/lib/Hooks/Lists/Todo/TodoListActivities.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import dynamic from "next/dynamic";
import ListSection from "../../mainPage/ListSection/ListSection.component";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function TodoList() {
  const { ListToDoFiltered, ListToDoForgot, selectedToDo } = useTodoList();
  const { CompleteItem, DelItem, SelectItem, BringTodayItem } =
    TodoListActivities();

  return (
    <>
      <ListSection
        drawerType="Todos"
        formType="Add"
        drawerTitle="Todo"
        selectedID={selectedToDo && !!selectedToDo.id}
        ListFilteredTilte="Todos"
        ListForgotTilte="Old Todos"
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
        drawerTitle={selectedToDo.title}
        isComplete={selectedToDo && selectedToDo.isComplete}
        CompleteItem={() => CompleteItem(selectedToDo.id, selectedToDo.title)}
        UndoneItem={() => CompleteItem(selectedToDo.id, selectedToDo.title)}
        DelItem={() => DelItem()}
        SelectItem={() => SelectItem()}
        BringTodayItem={() => BringTodayItem({ ...selectedToDo })}
        DuplicateItem
        selected={selectedToDo}
      />
    </>
  );
}

export default TodoList;
