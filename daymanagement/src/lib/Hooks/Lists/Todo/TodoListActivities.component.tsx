"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeToDoList,
  delToDoList,
  selectToDoList,
  TToDo,
  updateToDoList,
} from "@/modules/toDoList/todo.slice";
import { toast } from "react-toastify";
import { currentUnixTimestamp } from "../../UseDayJS";
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
  const DelItem = (id: string, title: string) => {
    dispatch(delToDoList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeToDoList(id));
    id && selectedToDo && dispatch(selectToDoList(id));
    toast(`${title} is updated`);
  };
  const BringTodayItem = (item: TToDo) => {
    dispatch(updateToDoList({ ...item, doDate: currentUnixTimestamp }));
    item.id && selectedToDo && dispatch(selectToDoList(item.id));
    toast(`${item.title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem, BringTodayItem };
}

export default TodoListActivities;
