import AddTimerButton from "./AddTimerButton";
import FormTimer from "./FormTimer";

export default function AddTimer() {
  return (
    <div className="flex flex-col h-full gap-4 px-5 col-span-1 pt-3">
      <div className="w-full">AddTimer</div>
      <FormTimer />
      <AddTimerButton />
    </div>
  );
}
