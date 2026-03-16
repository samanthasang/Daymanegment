"use client";
import MenuItems from "@/components/mainPage/MenuItems/HomeTodoItem.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";

function HomeTodoList({
  pathname,
  OpenMenu,
}: {
  pathname: string;
  OpenMenu: boolean;
}) {
  const ListToDo = useTodoList();

  return (
    <MenuItems
      href={"/todo"}
      tilte="Todo"
      className={pathname && pathname.startsWith("/todo") ? "bg-primary" : ""}
      infoNumber={
        OpenMenu
          ? `${ListToDo?.filter((todo) => todo.isComplete == true).length} / ${ListToDo?.length}`
          : ""
      }
    />
  );
}

export default HomeTodoList;
