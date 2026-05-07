"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeHabbitList,
  delHabbitList,
  selectHabbitList,
  Thabbit,
  updateHabbitList,
} from "@/modules/habbitList/habbit.slice";
import { toast } from "react-toastify";
import { DayUnixAdd } from "../../UseDayJS";
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
  const DelItem = (id: string, title: string) => {
    dispatch(delHabbitList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeHabbitList(id));
    id && selectedHabbit && dispatch(selectHabbitList(id));
    toast(`${title} is updated`);
  };
  const UndoItem = (item: Thabbit) => {
    dispatch(
      updateHabbitList({
        ...item,
        lastUpdate: DayUnixAdd(item.lastUpdate, "day", -1),
        score: item.score - 1,
        isComplete: false,
      })
    );
    item.id && selectedHabbit && dispatch(selectHabbitList(item.id));
    toast(`${item.title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem, UndoItem };
}

export default SelectHabbitListActivities;
