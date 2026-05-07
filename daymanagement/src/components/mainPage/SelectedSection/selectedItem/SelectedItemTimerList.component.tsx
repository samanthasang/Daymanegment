"use client";
import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import dayjs from "dayjs";
import ListItemTimeDiff from "../../ListSection/ListItem/ListItemTimeDiff.component";
import SelectedItemContainer from "./SelectedItemContainer.component";
import { Clock, Timer } from "lucide-react";

export const SelectedItemTimerList = ({
  isComplete,
  endDate,
  startDate,
}: {
  isComplete?: boolean;
  endDate?: number;
  startDate?: number;
}) => {
  const startD = dayjs.unix(Number(startDate));
  const endD = dayjs.unix(Number(endDate));
  const diff = dayjs.duration(endD.diff(startD));

  return (
    <div className="w-full flex flex-row justify-between gap-x-2">
      {startDate && (
        <SelectedItemContainer title="Start Time">
          <div className="flex flex-row items-center gap-x-1">
            <Clock width={12} height={12} />
            {DayUnixFormat(startDate, "HH:mm")}
          </div>
        </SelectedItemContainer>
      )}
      {isComplete && endDate && (
        <SelectedItemContainer title="End Time">
          <div className="flex flex-row items-center gap-x-1">
            <Clock width={12} height={12} />
            {DayUnixFormat(endDate, "HH:mm")}
          </div>
        </SelectedItemContainer>
      )}
      {isComplete && diff ? (
        <SelectedItemContainer title="Timer">
          <div className="flex flex-row items-center gap-x-1">
            <Timer width={12} height={12} />
            <label>
              {diff.years() > 0 && `${diff.years()} : `}
              {diff.months() > 0 && `${diff.months()} : `}
              {diff.days() > 0 && `${diff.days()} : `}
              {diff.hours() > 0 && `${diff.hours()} : `}
              {diff.minutes() > 0 && `${diff.minutes()} : `}
              {diff.seconds() < 10 ? `0${diff.seconds()}` : `${diff.seconds()}`}
            </label>
          </div>
        </SelectedItemContainer>
      ) : (
        <SelectedItemContainer title="Timer">
          <ListItemTimeDiff date={startDate} />
        </SelectedItemContainer>
      )}
    </div>
  );
};

export default SelectedItemTimerList;
