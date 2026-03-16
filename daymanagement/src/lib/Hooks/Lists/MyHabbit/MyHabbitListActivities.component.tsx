"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { completeMyHabbitList, delMyHabbitList, selectMyHabbitList } from "@/modules/myHabbitList/myHabbit.slice";
import { TToDo } from "@/modules/toDoList/todo.slice";
import { toast } from "react-toastify";

function MyHabbitListActivities() {
  const dispatch = useAppDispatch();

  const MyHabbit = useAppSelector((state) => state.MYhabbitList);

  const selectedhabbit = MyHabbit?.selectedMyHabbit as TToDo;

  const SelectItem = () => {
    dispatch(selectMyHabbitList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectMyHabbitList(id));
  };
  const DelItem = () => {
    dispatch(delMyHabbitList(selectedhabbit.id));
    SelectItem();
    toast(`${selectedhabbit.title} is deleted`);
  };
  const CompleteItemt = (id: string, title: string) => {
    dispatch(completeMyHabbitList(id));
    id && selectedhabbit && dispatch(selectMyHabbitList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItemt, DelItem, SelectWithId, SelectItem };
}

export default MyHabbitListActivities;
