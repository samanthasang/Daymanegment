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

  const selectedToDo = ToDo?.selectedToDo as TToDo;

  console.log(selectedToDo);

  const SelectItem = () => {
    dispatch(selectToDoList(""));
  };
  const SelectWithId = (id: string) => {
    console.log(id);

    dispatch(selectToDoList(id));
  };
  const DelItem = () => {
    dispatch(delToDoList(selectedToDo.id));
    SelectItem();
    toast(`${selectedToDo.title} is deleted`);
  };
  const CompleteItemt = (id: string, title: string) => {
    dispatch(completeToDoList(id));
    id && selectedToDo && dispatch(selectToDoList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItemt, DelItem, SelectWithId, SelectItem };
}

export default TodoListActivities;
