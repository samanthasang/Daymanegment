import FormTodo from "./FormTodo";

export default function AddToDo() {
  return (
    <div className="flex flex-col gap-4 px-5 col-span-1 pt-3">
      <div className="w-full">AddToDo</div>
      <FormTodo />
    </div>
  );
}
