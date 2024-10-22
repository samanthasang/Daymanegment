import { useEffect } from "react";
import { useAppSelector } from "../../lib/hook";
import AddToDo from "./AddTodo/AddToDo";

function TodoListComponent() {
  const { toDoList } = useAppSelector((state) => state.todoList) || [];
  useEffect(() => {
    console.log(toDoList);
  }, [toDoList]);

  return (
    <>
      <div>TodoList</div>
      <div className="flex flex-row gap-4">
        <AddToDo />
        {toDoList != null && toDoList.length > 0 && (
          <div className="flex flex-col gap-4 red">
            {toDoList?.map((li) => (
              <span>{li.title}</span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default TodoListComponent;
