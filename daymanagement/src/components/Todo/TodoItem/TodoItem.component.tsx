"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import TodoListActivities from "@/lib/Hooks/Lists/Todo/TodoListActivities.component";
import { TToDo } from "@/modules/toDoList/todo.slice";

export const TodoItem = ({
  item,
  selectedID,
}: {
  item: TToDo;
  selectedID?: string;
}) => {
  const { CompleteItemt, DelItem, SelectWithId } = TodoListActivities();

  return (
    <ListItem
      id={item.id}
      priority={item.priority}
      title={item.title}
      category={item.category}
      tag={item.tag}
      isComplete={item.isComplete}
      date={item.date}
      drawerType="TodoList"
      formType="Edit Todo"
      selectedID={selectedID}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={DelItem}
      CompleteItemt={() => CompleteItemt(item.id, item.title)}
    />
  );
};

export default TodoItem;
