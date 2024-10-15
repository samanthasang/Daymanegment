import React from "react";
import FormTodo from "./FormTodo";

export default function AddToDo({ setList }) {
  return (
    <div className="flex gap-4">
      <div>AddToDo</div>
      <FormTodo setList={setList} />
    </div>
  );
}
