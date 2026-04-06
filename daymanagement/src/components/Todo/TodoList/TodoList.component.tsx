"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import useTodoList from "@/lib/Hooks/Lists/Todo/UseTodoList.component";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import ListTitle from "../../mainPage/ListContainer/ListTitle.component";
import SelectedTodoList from "../TodoItem/SelectedTodoList.component";
import TodoCurrentList from "./TodoCurrentList.component";

function TodoList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();

  const { ListToDoFiltered, ListToDoForgot, selectedToDo } = useTodoList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedToDo) || isSMMin) && (
        <ListContainer selectedID={!!selectedToDo}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Todos"
            listCount={
              ListToDoFiltered.length > 0
                ? ListToDoFiltered?.filter((item) => !item.isComplete).length
                : undefined
            }
            secListCount={
              ListToDoForgot.length > 0
                ? ListToDoForgot?.filter((item) => !item.isComplete).length
                : undefined
            }
          />
          {!forgot ? (
            <TodoCurrentList
              ListToDo={ListToDoFiltered}
              selectedID={selectedToDo && selectedToDo.id}
            />
          ) : (
            <TodoCurrentList
              ListToDo={ListToDoForgot}
              selectedID={selectedToDo && selectedToDo.id}
            />
          )}
        </ListContainer>
      )}
      {selectedToDo && <SelectedTodoList />}
    </div>
  );
}

export default TodoList;
