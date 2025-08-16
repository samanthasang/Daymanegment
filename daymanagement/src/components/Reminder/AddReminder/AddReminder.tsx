import FormTodo from "./FormReminder";

export default function AddReminder() {
  return (
    <div className="flex flex-col gap-4 px-5 col-span-1 pt-3">
      <div className="w-full">AddReminder</div>
      <FormTodo />
    </div>
  );
}
