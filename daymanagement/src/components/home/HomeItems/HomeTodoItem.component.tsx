"use client";
import MenuItems from "@/components/mainPage/MenuItems/MenuItems.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";

function HomeTodoList() {
  const { ListToDoFiltered } = useTodoList();

  return (
    <MenuItems
      href={"/todo"}
      tilte="Todo"
      infoNumber={`${ListToDoFiltered?.filter((todo) => todo.isComplete == true).length} / ${ListToDoFiltered?.length}`}
    />
  );
}

export default HomeTodoList;
