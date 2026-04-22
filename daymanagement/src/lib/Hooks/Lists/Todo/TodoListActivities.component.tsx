"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeToDoList,
  delToDoList,
  selectToDoList
} from "@/modules/toDoList/todo.slice";
import { toast } from "react-toastify";
import useTodoList from "./UseTodoList.component";

function TodoListActivities() {
  const dispatch = useAppDispatch();

  const { selectedToDo } = useTodoList();

  const SelectItem = () => {
    dispatch(selectToDoList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectToDoList(id));
  };
  const DelItem = () => {
    dispatch(delToDoList(selectedToDo.id));
    SelectItem();
    toast(`${selectedToDo.title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeToDoList(id));
    id && selectedToDo && dispatch(selectToDoList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem };
}

export default TodoListActivities;
