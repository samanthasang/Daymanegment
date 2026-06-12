"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import { currentUnixTimestampZero, DayUnixAdd } from "@/lib/Hooks/UseDayJS";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import { useState } from "react";

function TodoInfo() {
  const [forgot, setForgot] = useState(false);
  const { ListToDoFiltered, ListToDoForgot, ListToDoAll } = useTodoList();

  const TodosLenght = ListToDoFiltered.length;
  const TodosFinishLenght = NotFinishedArray(ListToDoFiltered).length;
  const TodosNotFinishLenght = FinishedArray(ListToDoFiltered).length;
  const TodosTodayLenght = ListToDoAll.filter(
    (item) =>
      item.doDate >= currentUnixTimestampZero &&
      item.doDate <= DayUnixAdd(currentUnixTimestampZero, "day", 1)
  );
  const TodayTodosFinishLenght = NotFinishedArray(TodosTodayLenght).length;
  const TodayTodosNotFinishLenght = FinishedArray(TodosTodayLenght).length;

  const OldTodosLenght = ListToDoForgot.length;
  const OldTodosFinishLenght = NotFinishedArray(ListToDoForgot).length;
  const OldTodosNotFinishLenght = FinishedArray(ListToDoForgot).length;

  const tTodo: any = UseLangComponent("Todos");
  const t: any = UseLangComponent("Drawer");
  return (
    <div className="w-full min-w-96 flex flex-col gap-y-2">
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={tTodo.title}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={tTodo.forgotTilte}
        />
      </ListTitleContainer>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>{t.AllTodos}</span>
        {!forgot ? TodosLenght : OldTodosLenght}
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>{t.DoneStatus}</span>
        <div className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5">
          <span className="text-successGreen border-r-[1px] pr-1 border-blue-500">
            {!forgot ? TodosFinishLenght : OldTodosFinishLenght}
          </span>
          <span className="text-errorRed">
            {!forgot ? TodosNotFinishLenght : OldTodosNotFinishLenght}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>{t.TodayTodos}</span>
        <div className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5">
          <span className="text-successGreen border-r-[1px] pr-1 border-blue-500">
            {TodayTodosFinishLenght}
          </span>
          <span className="text-errorRed">{TodayTodosNotFinishLenght}</span>
        </div>
      </div>
    </div>
  );
}

export default TodoInfo;
