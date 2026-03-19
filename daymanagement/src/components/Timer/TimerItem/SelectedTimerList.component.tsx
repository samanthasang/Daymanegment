"use client";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import TimerListActivities from "@/lib/Hooks/Lists/Timer/TimerListActivities.component";
import { TTimer } from "@/modules/timerList/timer.slice";
import dayjs from "dayjs";

function SelectedTimerList() {
  const { CompleteItemt, DelItem, SelectItem } = TimerListActivities();

  const Timer = useAppSelector((state) => state.TimerList);

  const selectedTimer = Timer?.selectedTimer as TTimer;

  const startD = selectedTimer && dayjs.unix(Number(selectedTimer.startDate));
  const endD = selectedTimer && dayjs.unix(Number(selectedTimer.endDate));
  const diff = selectedTimer && dayjs.duration(endD.diff(startD));

  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
      <SelectedItem
        CompleteItemt={() =>
          CompleteItemt(selectedTimer.id, selectedTimer.title)
        }
        drawerType="TimerList"
        diff={diff}
        {...selectedTimer}
      />
      <SelectedMenuBottom
        CompleteItemt={() =>
          CompleteItemt(selectedTimer.id, selectedTimer.title)
        }
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="TimerList"
        formType="Edit Timer"
        selectedIsComplete={selectedTimer.isComplete}
      />
    </div>
  );
}

export default SelectedTimerList;
