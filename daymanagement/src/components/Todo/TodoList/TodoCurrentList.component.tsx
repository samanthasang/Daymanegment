"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import DateOrderFilter from "@/lib/Hooks/DateOrderFilter.component";
import FinishedFIlter from "@/lib/Hooks/FinishedFIlter.componen";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import { cn } from "@/lib/utils";
import { TToDo } from "@/modules/toDoList/todo.slice";
import TodoItem from "../TodoItem/TodoItem.component";

function TodoCurrentList({
  ListToDo,
  selectedID,
}: {
  ListToDo: TToDo[];
  selectedID: string;
}) {
  const { dateOrderArray, dateOrderFilter } = DateOrderFilter(ListToDo);

  const { finishArray, finishFIlter, setFinishFIlter } = dateOrderFilter
    ? FinishedFIlter([...dateOrderArray] as any)
    : ([...ListToDo] as any);

  const { priorityArray, priorityFilter, setPriorityFilter } =
    finishArray && finishFIlter
      ? PriorityFilter([...finishArray] as any)
      : PriorityFilter([...ListToDo] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...finishArray] as any);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full gap-y-2 ml-1",
          complateArray && complateArray.length > 5
            ? "scroll-m-0 overflow-y-scroll"
            : ""
        )}
      >
        {complateArray?.length == 0 ? (
          <EmptyList />
        ) : (
          complateArray?.map((li: TToDo) => (
            <TodoItem key={li.id} item={li} selectedID={selectedID} />
          ))
        )}
      </div>
      <ListMenuBottom
        listTitle="Todos"
        drawerType="TodoList"
        formType="Add Todo"
        selectedID={!!selectedID}
        priorityFilter={priorityFilter}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFIlter}
        withpriority
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangePriority={() => setPriorityFilter(!priorityFilter)}
        ChangeDate={() => setFinishFIlter(!finishFIlter)}
        ListInfo={`${complateArray?.filter((item) => item.isComplete == true).length} / ${complateArray?.length}`}
      />
    </>
  );
}

export default TodoCurrentList;
