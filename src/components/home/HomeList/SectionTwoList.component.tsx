"use client";

import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";

function SectionTwo() {
  const { ListToDoFiltered } = useTodoList();
  const { ListGoalsFiltered } = useGoalsList();

  return (
    <ListSection
      drawerType="Todos"
      formType="Add"
      drawerTitle="Todo"
      selectedID={false}
      ListFilteredTilte="Todos"
      ListForgotTilte="Goals"
      ListFilteredCount={ListToDoFiltered.length}
      ListForgotCount={ListGoalsFiltered.length}
      ListFiltered={ListToDoFiltered as []}
      ListForgot={ListGoalsFiltered as []}
    />
  );
}

export default SectionTwo;
