"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeToDoList,
  delToDoList,
  selectToDoList,
  setToDoList,
  TToDo,
  updateToDoList,
} from "@/modules/toDoList/todo.slice";
import { toast } from "react-toastify";
import { currentUnixTimestamp, DayUnixAdd } from "../../UseDayJS";
import useTodoList from "./UseTodoList.component";
import dayjs from "dayjs";

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
    const oldDate = dayjs.unix(item.doDate);
    const now = dayjs();
    dispatch(
      updateToDoList({
        ...item,
        doDate: dayjs(
          new Date(
            now.year(),
            now.month(),
            now.date(),
            oldDate.hour(),
            oldDate.minute(),
            oldDate.second()
          )
        ).unix(),
      })
    );
    item.id && selectedToDo && dispatch(selectToDoList(item.id));
    toast(`${item.title} is updated`);
  };
  const DuplicateTodayItem = (item: TToDo) => {
    const oldDate = dayjs.unix(item.doDate);
    const now = dayjs();
    dispatch(
      setToDoList({
        ...item,
        id: "",
        title: `${item.title} copy`,
        doDate: dayjs(
          new Date(
            now.year(),
            now.month(),
            now.date(),
            oldDate.hour(),
            oldDate.minute(),
            oldDate.second()
          )
        ).unix(),
      })
    );
    item.id && selectedToDo && dispatch(selectToDoList(item.id));
    toast(`${item.title} is updated`);
  };
  const AddDayToItem = (item: TToDo, day: number) => {
    dispatch(
      updateToDoList({
        ...item,
        doDate: DayUnixAdd(item.doDate, "day", day),
      })
    );
    item.id && selectedToDo && dispatch(selectToDoList(item.id));
    toast(`${item.title} is updated`);
  };
  return {
    CompleteItem,
    DelItem,
    SelectWithId,
    SelectItem,
    BringTodayItem,
    DuplicateTodayItem,
    AddDayToItem,
  };
}

export default TodoListActivities;
