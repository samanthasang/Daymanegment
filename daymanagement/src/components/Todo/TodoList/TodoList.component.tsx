"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ListItem from "@/components/mainPage/listItem/ListItem.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import TodoListActivities from "@/lib/Hooks/Lists/Todo/TodoListActivities.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import { cn } from "@/lib/utils";
import { selectToDoList, TToDo } from "@/modules/toDoList/todo.slice";
import { useEffect } from "react";

function TodoList() {
  const dispatch = useAppDispatch();

  const ListToDo = useTodoList();

  const { CompleteItemt, DelItem, SelectItem, SelectWithId } =
    TodoListActivities();
  
  const { priorityArray, priorityFilter, setPriorityFilter } = PriorityFilter(
    ListToDo as any
  );

  const { complateArray, complateFIlter, setcomplateFIlter } =
    priorityArray && priorityFilter
      ? ComplateFIlter([...priorityArray] as any)
      : ComplateFIlter([...ListToDo] as any);

  const ToDo = useAppSelector((state) => state.todoList);

  const selectedToDo = ToDo?.selectedToDo as TToDo;

  useEffect(() => {
    ListToDo.length == 0 && dispatch(selectToDoList(""));
  }, [ListToDo]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer listTitle="Todos" selectedID={!!selectedToDo}>
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1",
            ListToDo && ListToDo.length > 5
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListToDo?.length == 0 ? (
            <EmptyList />
          ) : (
            complateArray?.map((li: TToDo) => (
              <ListItem
                key={li.id}
                drawerType="TodoList"
                formType="Edit Todo"
                selectedID={selectedToDo && selectedToDo.id}
                SelectItem={() => SelectWithId(li.id)}
                DelItem={DelItem}
                CompleteItemt={() => CompleteItemt(li.id, li.title)}
                {...li}
              />
            ))
          )}
        </div>
        <ListMenuBottom
          listTitle="Todos"
          drawerType="TodoList"
          formType="Add Todo"
          selectedID={!!selectedToDo}
          priorityFilter={priorityFilter}
          complateFIlter={complateFIlter}
          withpriority
          withcomplate
          ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
          ChangePriority={() => setPriorityFilter(!priorityFilter)}
          ListInfo={`${ListToDo?.filter((todo) => todo.isComplete == true).length} / ${ListToDo?.length}`}
        />
      </ListContainer>
      {selectedToDo && (
        <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
          <SelectedItem
            CompleteItemt={() =>
              CompleteItemt(selectedToDo.id, selectedToDo.title)
            }
            {...selectedToDo}
          />
          <SelectedMenuBottom
            CompleteItemt={() =>
              CompleteItemt(selectedToDo.id, selectedToDo.title)
            }
            DelItem={DelItem}
            SelectItem={SelectItem}
            drawerType="TodoList"
            formType="Edit Todo"
            selectedIsComplete={selectedToDo.isComplete}
          />
        </div>
      )}
    </div>
  );
}

export default TodoList;
