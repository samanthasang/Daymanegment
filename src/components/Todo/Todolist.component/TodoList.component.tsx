"use client"
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { delToDoList, updateToDoList } from "@/modules/toDoList/todo.slice";
import dayjs from "dayjs";
export const dynamic = 'force-dynamic'


function TodoList() {
  const dispatch = useAppDispatch();
  const { toDoList } = useAppSelector((state) => state.todoList);

  if (toDoList.length > 0) {
    return (
      <div className="w-3/4 bg-slate-600 p-5 rounded-md">
        <div className="flex flex-col gap-4 w-full">
          {toDoList.map((li) => (
            <div
            key={li.id}
              onClick={(e) => {
                e.preventDefault();
                dispatch(updateToDoList(li.id));
              }}
              className="flex items-center justify-between cursor-pointer border-2 border-slate-200/70 rounded-md p-2 text-slate-200/70
              hover:text-slate-200 hover:border-slate-200"
            >
              <span className={`${li.isComplete ? "line-through" : ""}`}>
                {li.name}
              </span>
              <span className={`${li.isComplete ? "line-through" : ""}`}>
                {+li.priority == 1 ? "^" : +li.priority == 2 ? "-" :"_"}
              </span>
              <span>
                {dayjs(li.dob).format("YYYY:MM:DD")}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(delToDoList(li.id));
                }}
                className="text-red-400"
                >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    ); 
  }
  return (
    <div className="w-3/4 bg-slate-600 p-5 rounded-md">
      <div className="flex flex-col gap-4 w-full">
        <span>no Data</span>
      </div>
    </div>
  )
}

export default TodoList;
