"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeHabbitList,
  delHabbitList,
  selectHabbitList,
} from "@/modules/habbitList/habbit.slice";
import { toast } from "react-toastify";
import UseHabbitList from "./UseHabbitList.component";

function SelectHabbitListActivities() {
  const dispatch = useAppDispatch();

  const { selectedHabbit } = UseHabbitList();

  const SelectItem = () => {
    dispatch(selectHabbitList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectHabbitList(id));
  };
  const DelItem = () => {
    dispatch(delHabbitList(selectedHabbit.id));
    SelectItem();
    toast(`${selectedHabbit.title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeHabbitList(id));
    id && selectedHabbit && dispatch(selectHabbitList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem };
}

export default SelectHabbitListActivities;
