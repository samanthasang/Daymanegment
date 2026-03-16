"use client";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import { useAppDispatch } from "@/lib/hook";
import {
  completeToDoList,
  delToDoList,
  selectToDoList,
  TToDo,
} from "@/modules/toDoList/todo.slice";
import { toast } from "react-toastify";

export const TodoItem = ({
  item,
  selectedID,
}: {
  item: TToDo;
  selectedID?: string;
}) => {
  const dispatch = useAppDispatch();

  const SelectToDoList = () => {
    dispatch(selectToDoList(item.id));
  };
  const DelToDoList = () => {
    dispatch(delToDoList(item.id));
    toast(`${item.title} is deleted`);
  };
  const CompleteToDoList = () => {
    dispatch(completeToDoList(item.id));
    item.isComplete
      ? toast(`${item.title} is uncompleted`)
      : toast(`${item.title} is completed`);
  };
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
      SelectItem={SelectToDoList}
      DelItem={DelToDoList}
      CompleteItemt={CompleteToDoList}
    />
  );
};

export default TodoItem;
