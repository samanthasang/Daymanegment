import { CheckCircle, Done, DoneAll } from "@/components/icons";
import { useAppDispatch } from "@/lib/hook";
import {
  completeReminderList,
  updateTimeReminderList,
} from "@/modules/reminderList/reminder.slice";
import { toast } from "react-toastify";

export const SelectedItemReminder = ({
  id,
  title,
  isfinished,
  isComplete,
}: {
  id: string;
  title: string;
  isfinished: boolean;
  isComplete: boolean;
}) => {
  const dispatch = useAppDispatch();
  const UpdateTimeReminderList = () => {
    dispatch(updateTimeReminderList(id));
    toast(`${title} is updated`);
  };
  const CompleteReminderList = () => {
    dispatch(completeReminderList(id));
    toast(`${title} is completed`);
  };
  return (
    <>
      <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
        <label className="text-xl">Done All</label>
        <div
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            CompleteReminderList();
          }}
        >
          {isfinished ? <CheckCircle /> : <Done />}
        </div>
      </div>
      <div className="w-full flex flex-row flex-1 gap-2 justify-between items-center">
        <label className="text-xl">Done</label>
        <div
          onClick={(e) => {
            e && e.preventDefault();
            e && e.stopPropagation();
            !isfinished && UpdateTimeReminderList();
          }}
        >
          {isComplete ? <CheckCircle /> : <Done />}
        </div>
      </div>
    </>
  );
};

export default SelectedItemReminder;
