"use client";
import { useAppSelector } from "@/lib/hook";
import { TToDo } from "@/modules/toDoList/todo.slice";
import CategoryFilter from "../../Filters/CategoryFilter.componen";
import DateFromFilter from "../../Filters/DateFromFilter";
import DateToFilter from "../../Filters/DateToFilter";
import TagFilter from "../../Filters/TagFilter.componen";
import DateMinusOrderFilter from "../../ListFilter/DateMinusOrderFilter.component";
import DatePlusOrderFilter from "../../ListFilter/DatePlusOrderFilter.component";
import {
  currentUnixTimestampZero
} from "../../UseDayJS";

function useTodoList() {
  const ToDo = useAppSelector((state) => state.todoList);

  const selectedToDo = ToDo?.selectedToDo as TToDo;
  const ListToDo = ToDo?.ListToDo as TToDo[];

  const dateFromArray = DateFromFilter([...ListToDo]);

  const dateToArray = DateToFilter([...dateFromArray]);

  const categoryArray = CategoryFilter([...dateToArray]);

  const ListToDoFiltered = TagFilter([...categoryArray]);

  const ListToDoForgot = ListToDo.filter(
    (item) => +item.doDate < currentUnixTimestampZero
  );

  const dateUpOrderArray: TToDo[] = DatePlusOrderFilter(ListToDoFiltered);
  const dateDOwnOrderArray: TToDo[] = DateMinusOrderFilter(ListToDoForgot);

  return {
    ListToDoFiltered: dateUpOrderArray,
    ListToDoAll: ListToDo,
    ListToDoForgot: dateDOwnOrderArray,
    selectedToDo,
  };
}

export default useTodoList;
