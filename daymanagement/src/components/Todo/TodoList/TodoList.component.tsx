"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import useTodoList from "@/lib/Hooks/Lists/UseTodoList.component";
import { TToDo } from "@/modules/toDoList/todo.slice";
import TodoItem from "../TodoItem/TodoItem.component";

function TodoList() {
  const ListToDo = useTodoList();

  return (
    <ListContainer
      listTitle="Todos"
      ListInfo={`${ListToDo?.filter((todo) => todo.isComplete == true).length} / ${ListToDo?.length}`}
      scrollOn={(ListToDo && ListToDo.length !== 0) || false}
    >
      {ListToDo?.length == 0 ? (
        <EmptyList />
      ) : (
        ListToDo?.map((li: TToDo) => <TodoItem key={li.id} item={li} />)
      )}
    </ListContainer>
  );
}

export default TodoList;
