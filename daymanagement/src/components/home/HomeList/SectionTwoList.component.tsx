"use client";

import GoalsItem from "@/components/Goals/GoalsItem/GoalsItem.component";
import EmptyList from "@/components/mainPage/List/EmptyList/EmptyList.component";
import ListTitle from "@/components/mainPage/List/ListContainer/ListTitle.component";
import TodoItem from "@/components/Todo/TodoItem/TodoItem.component";
import useGoalsList from "@/lib/Hooks/Lists/Goal/UseGoalsList.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import { cn } from "@/lib/utils";
import { TGoals } from "@/modules/goalsList/goals.slice";
import { TToDo } from "@/modules/toDoList/todo.slice";
import { useState } from "react";

function SectionTwo() {
  const [forgot, setForgot] = useState(false);
  const { ListToDoFiltered } = useTodoList();
  const { ListGoalsFiltered } = useGoalsList();

  return (
    <>
      <ListTitle
        forgot={forgot}
        setForgot={(f) => setForgot(f)}
        title="Todos"
        titleSec="Goals"
        listCount={
          ListToDoFiltered.length > 0
            ? ListToDoFiltered?.filter((item) => !item.isComplete).length
            : undefined
        }
        secListCount={
          ListGoalsFiltered.length > 0
            ? ListGoalsFiltered?.filter((item) => !item.isComplete).length
            : undefined
        }
      />
      {!forgot ? (
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1 max-h-[50vh]",
            ListToDoFiltered && ListToDoFiltered.length > 3
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListToDoFiltered?.length == 0 ? (
            <EmptyList />
          ) : (
            ListToDoFiltered?.map((li: TToDo) => (
              <TodoItem key={li.id} item={li} />
            ))
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1 max-h-[50vh]",
            ListGoalsFiltered && ListGoalsFiltered.length > 3
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListGoalsFiltered?.length == 0 ? (
            <EmptyList />
          ) : (
            ListGoalsFiltered?.map((li: TGoals) => (
              <GoalsItem key={li.id} item={li} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default SectionTwo;
