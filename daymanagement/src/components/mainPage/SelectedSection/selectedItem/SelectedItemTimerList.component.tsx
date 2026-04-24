"use client";
import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import dayjs from "dayjs";
import ListItemTimeDiff from "../../ListSection/ListItem/ListItemTimeDiff.component";
import SelectedItemContainer from "./SelectedItemContainer.component";

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
    <div className="w-full flex flex-row justify-between gap-x-3">
      {startDate && (
        <SelectedItemContainer
          title="Start Time"
          description={DayUnixFormat(startDate, "hh:MM")}
        />
      )}
      {isComplete && endDate && (
        <SelectedItemContainer
          title="End Time"
          description={DayUnixFormat(endDate, "hh:MM")}
        />
      )}
      {isComplete && diff ? (
        <SelectedItemContainer title="Timer">
          <label>
            {diff.years() > 0 && `${diff.years()} : `}
            {diff.months() > 0 && `${diff.months()} : `}
            {diff.days() > 0 && `${diff.days()} : `}
            {diff.hours() > 0 && `${diff.hours()} : `}
            {diff.minutes() > 0 && `${diff.minutes()} : `}
            {diff.seconds() < 10 ? `0${diff.seconds()}` : `${diff.seconds()}`}
          </label>
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
