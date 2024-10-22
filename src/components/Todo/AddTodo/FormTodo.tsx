import { useState } from "react";
import { useAppDispatch } from "../../../lib/hook";
import { setToDoList } from "../../../modules/toDoList/todo.slice";

export default function FormTodo() {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch();


  return (
    <>
      <div className="flex flex-col gap-2"></div>
      <form>
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          value={value}
        />
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setToDoList(value));
            setValue("");
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
