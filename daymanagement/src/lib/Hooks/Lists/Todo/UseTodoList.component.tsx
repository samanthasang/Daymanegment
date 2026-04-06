"use client";
import { useAppSelector } from "@/lib/hook";
import { TToDo } from "@/modules/toDoList/todo.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import { currentUnixTimestampZero } from "../../UseDayJS";

function useTodoList() {
  const ToDo = useAppSelector((state) => state.todoList);

  const selectedToDo = ToDo?.selectedToDo as TToDo;
  const ListToDo = ToDo?.ListToDo as TToDo[];

  const dateFromArray = DateFromFilter([...ListToDo] as any);

  const dateToArray = DateToFilter([...dateFromArray] as any);

  const categoryArray = CategoryFilter([...dateToArray] as any);

  const ListToDoFiltered = TagFilter([...categoryArray] as any);

  const ListToDoForgot = ListToDo.filter(
    (a) => +a.date < currentUnixTimestampZero
  );

  return {
    ListToDoFiltered,
    ListToDoAll: ListToDo,
    ListToDoForgot,
    selectedToDo,
  };
}

export default useTodoList;
