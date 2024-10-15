import { useState } from "react";

export default function FormTodo({ setList }) {
  const [value, setValue] = useState("");

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
            setList((prev) => {
              return prev ? [...prev, value] : [value];
            });
          }}
        >
          submit
        </button>
      </form>
    </>
  );
}
