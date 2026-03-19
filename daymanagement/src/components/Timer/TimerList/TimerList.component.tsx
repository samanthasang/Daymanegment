"use client";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useTimerList from "@/lib/Hooks/Lists/Timer/UseTimerList.component";
import { selectTimerList, TTimer } from "@/modules/timerList/timer.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import SelectedTimerList from "../TimerItem/SelectedTimerList.component";
import TimerListCurrent from "./TimerListCurrent.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function TimerList() {
  const dispatch = useAppDispatch();
  const [forgot, setForgot] = useState(false);

  const Timer = useAppSelector((state) => state.TimerList);

  const selectedTimer = Timer?.selectedTimer as TTimer;

  const ListTimer = useTimerList();
  const ListTimerAll = Timer?.ListTimer as TTimer[];
  const ListTimerForgot = ListTimerAll.filter(
    (a) =>
      dayjs(dayjs.unix(Number(a.startDate))) <
      dayjs(dayjs.unix(Number(currentUnixTimestamp)))
  );

  useEffect(() => {
    ListTimer.length == 0 && dispatch(selectTimerList(""));
  }, [ListTimer]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedTimer}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Timer"
        />
        {!forgot ? (
          <TimerListCurrent
            ListTimer={ListTimer}
            selectedID={selectedTimer && selectedTimer.id}
          />
        ) : (
          <TimerListCurrent
            ListTimer={ListTimerForgot}
            selectedID={selectedTimer && selectedTimer.id}
          />
        )}
      </ListContainer>
      {selectedTimer && <SelectedTimerList />}
    </div>
  );
}

export default TimerList;
