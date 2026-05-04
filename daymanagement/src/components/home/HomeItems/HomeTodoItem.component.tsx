"use client";
import MenuItems from "@/components/mainPage/Page/MenuItems/MenuItems.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";

function HomeTodoList() {
  const { ListToDoFiltered } = useTodoList();

  return (
    <MenuItems
      href={"/todos"}
      tilte="Todos"
      infoNumber={`${FinishedArray(ListToDoFiltered).length} / ${ListToDoFiltered?.length}`}
    />
  );
}

export default HomeTodoList;
