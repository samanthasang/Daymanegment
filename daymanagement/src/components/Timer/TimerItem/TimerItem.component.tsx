"use client";
import ListItem from "@/components/mainPage/ListSection/ListItem/ListItem.component";
import TimerListActivities from "@/lib/Hooks/Lists/Timer/TimerListActivities.component";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import { TTimer } from "@/modules/timerList/timer.slice";
import dayjs from "dayjs";

export const Timeritem = ({ item }: { item: TTimer }) => {
  const { selectedTimer } = useTimerList();

  const { CompleteItem, DelItem, SelectWithId } = TimerListActivities();

  const timerTItle =
    item.title.split("-").length > 1
      ? item.title.split("-")[0] +
        "-" +
        dayjs(dayjs.unix(Number(+item.title.split("-")[1]))).format(
          "YYYY-MM-DD HH:mm:ss"
        )
      : item.title;

  const startD = dayjs.unix(Number(item.startDate));
  const endD = dayjs.unix(Number(item.endDate));
  const diff = dayjs.duration(endD.diff(startD));

  return (
    <ListItem
      date={item.startDate}
      diff={diff}
      drawerType="Timers"
      selectedID={selectedTimer && selectedTimer.id}
      SelectItem={() => SelectWithId(item.id)}
      DelItem={() => DelItem(item.id, item.title)}
      CompleteItem={() => CompleteItem(item.id, item.title)}
      {...item}
      title={timerTItle}
      isFinish={!!item.endDate && item.isComplete}
    />
  );
};

export default Timeritem;
