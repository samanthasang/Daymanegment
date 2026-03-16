"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  completeHabbitList,
  delHabbitList,
  selectHabbitList,
} from "@/modules/habbitList/habbit.slice";
import { TToDo } from "@/modules/toDoList/todo.slice";
import { toast } from "react-toastify";

function SelectHabbitListActivities() {
  const dispatch = useAppDispatch();

  const Habbit = useAppSelector((state) => state.habbitList);

  const selectedhabbit = Habbit?.selectedhabbit as TToDo;

  const SelectItem = () => {
    dispatch(selectHabbitList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectHabbitList(id));
  };
  const DelItem = () => {
    dispatch(delHabbitList(selectedhabbit.id));
    SelectItem();
    toast(`${selectedhabbit.title} is deleted`);
  };
  const CompleteItemt = (id: string, title: string) => {
    dispatch(completeHabbitList(id));
    id && selectedhabbit && dispatch(selectHabbitList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItemt, DelItem, SelectWithId, SelectItem };
}

export default SelectHabbitListActivities;
