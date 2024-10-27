import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../lib/hook";
import AddToDo from "./AddTodo/AddToDo";
import { delToDoList, updateToDoList } from "../../modules/toDoList/todo.slice";

function TodoListComponent() {
  const dispatch = useAppDispatch();
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
          <div className="flex flex-col gap-4 w-full red">
            {toDoList?.map((li) => (
              <div
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(updateToDoList(li.id));
                }}
                className="flex items-center justify-between"
              >
                <span className={` ${li.isComplete ? "line-through" : ""}`}>
                  {li.title}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(delToDoList(li.id));
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default TodoListComponent;
