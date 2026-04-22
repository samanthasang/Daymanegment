"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import TodoListActivities from "@/lib/Hooks/Lists/Todo/TodoListActivities.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import { TToDo } from "@/modules/toDoList/todo.slice";

export const TodoItem = ({ item }: { item: TToDo }) => {
  const { CompleteItem, DelItem, SelectWithId } = TodoListActivities();
  const { selectedToDo } = useTodoList();

  return (
    <ListItem
      date={item.doDate}
      drawerType="TodoList"
      selectedID={selectedToDo && selectedToDo.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItem={() => CompleteItem(item.id, item.title)}
      {...item}
    />
  );
};

export default TodoItem;
