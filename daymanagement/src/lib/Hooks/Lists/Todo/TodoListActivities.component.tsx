"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  completeToDoList,
  delToDoList,
  selectToDoList,
  TToDo,
} from "@/modules/toDoList/todo.slice";
import { toast } from "react-toastify";

function TodoListActivities() {
  const dispatch = useAppDispatch();

  const ToDo = useAppSelector((state) => state.todoList);

  const selectedhabbit = ToDo?.selectedToDo as TToDo;

  const SelectItem = () => {
    dispatch(selectToDoList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectToDoList(id));
  };
  const DelItem = () => {
    dispatch(delToDoList(selectedhabbit.id));
    SelectItem();
    toast(`${selectedhabbit.title} is deleted`);
  };
  const CompleteItemt = (id: string, title: string) => {
    dispatch(completeToDoList(id));
    id && selectedhabbit && dispatch(selectToDoList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItemt, DelItem, SelectWithId, SelectItem };
}

export default TodoListActivities;
