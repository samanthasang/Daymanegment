"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import { selectToDoList, TToDo } from "@/modules/toDoList/todo.slice";
import { useEffect, useState } from "react";
import ListTitle from "../../mainPage/ListContainer/ListTitle.component";
import SelectedTodoList from "../TodoItem/SelectedTodoList.component";
import TodoCurrentList from "./TodoCurrentList.component";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function TodoList() {
  const dispatch = useAppDispatch();
  const [forgot, setForgot] = useState(false);

  const ToDo = useAppSelector((state) => state.todoList);

  const selectedToDo = ToDo?.selectedToDo as TToDo;

  const ListToDo = useTodoList();
  const ListToDoAll = ToDo?.ListToDo as TToDo[];
  const ListToDoForgot = ListToDoAll.filter(
    (a) =>
      dayjs(dayjs.unix(Number(a.date))) <
      dayjs(dayjs.unix(Number(currentUnixTimestamp)))
  );

  useEffect(() => {
    ListToDo.length == 0 && dispatch(selectToDoList(""));
  }, [ListToDo]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedToDo}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Todos"
        />
        {!forgot ? (
          <TodoCurrentList
            ListToDo={ListToDo}
            selectedID={selectedToDo && selectedToDo.id}
          />
        ) : (
          <TodoCurrentList
            ListToDo={ListToDoForgot}
            selectedID={selectedToDo && selectedToDo.id}
          />
        )}
      </ListContainer>
      {selectedToDo && <SelectedTodoList />}
    </div>
  );
}

export default TodoList;
