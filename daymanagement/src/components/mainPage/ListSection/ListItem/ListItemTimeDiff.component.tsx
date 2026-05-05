import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Timer } from "lucide-react";
import { useEffect, useState } from "react";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

export const ListItemTimeDiff = ({ date }: { date?: string | number }) => {
  const startD = dayjs.unix(Number(date));

  const [dateState, setDateState] = useState<duration.Duration>(
    dayjs.duration(
      dayjs.unix(Number(new Date().getTime() / 1000.0)).diff(startD)
    )
  );

  useEffect(() => {
    setDateState(
      dayjs.duration(
        dayjs.unix(Number(new Date().getTime() / 1000.0)).diff(startD)
      )
    );
  }, [date]);
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setDateState(
        dayjs.duration(
          dayjs.unix(Number(new Date().getTime() / 1000.0)).diff(startD)
        )
      );
    }, 1000);
    return () => clearInterval(countdownInterval);
  }, [date]);

  return (
    <div className="flex flex-row items-center gap-x-1">
      <Timer width={12} height={12} />
      <label className="cursor-pointer px-2 py-1 rounded-2xl bg-success">
        {dateState.years() > 0 && `${dateState.years()} : `}
        {dateState.months() > 0 && `${dateState.months()} : `}
        {dateState.days() > 0 && `${dateState.days()} : `}
        {dateState.hours() > 0 && `${dateState.hours()} : `}
        {dateState.minutes() > 0 && `${dateState.minutes()} : `}
        {dateState.seconds() < 10
          ? `0${dateState.seconds()}`
          : `${dateState.seconds()}`}
      </label>
    </div>
  );
};

export default ListItemTimeDiff;
