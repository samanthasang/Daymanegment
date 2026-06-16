"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeHabitList,
  delHabitList,
  PauseHabitList,
  selectHabitList,
  Thabit,
  updateHabitList,
} from "@/modules/habbitList/habbit.slice";
import { toast } from "react-toastify";
import { DayUnixAdd } from "../../UseDayJS";
import UseHabbitList from "./UseHabbitList.component";

function SelectHabbitListActivities() {
  const dispatch = useAppDispatch();

  const { selectedHabbit } = UseHabbitList();

  const SelectItem = () => {
    dispatch(selectHabitList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectHabitList(id));
  };
  const DelItem = (id: string, title: string) => {
    dispatch(delHabitList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeHabitList(id));
    id && selectedHabbit && dispatch(selectHabitList(id));
    toast(`${title} is updated`);
  };
  const PauseItem = (id: string, title: string) => {
    dispatch(PauseHabitList(id));
    id && selectedHabbit && dispatch(selectHabitList(id));
    toast(`${title} is updated`);
  };
  const UndoItem = (item: Thabit) => {
    dispatch(
      updateHabitList({
        ...item,
        doDate: DayUnixAdd(
          item.doDate,
          "day",
          !!item?.customDays ? -item?.customDays : -1
        ),
        score: item.score - 1,
        isComplete: false,
      })
    );
    item.id && selectedHabbit && dispatch(selectHabitList(item.id));
    toast(`${item.title} is updated`);
  };
  return {
    CompleteItem,
    DelItem,
    SelectWithId,
    SelectItem,
    UndoItem,
    PauseItem,
  };
}

export default SelectHabbitListActivities;
