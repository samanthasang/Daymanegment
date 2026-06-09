import { DayUnixDiff, DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import duration from "dayjs/plugin/duration";
import ListItemTimeDiff from "./ListItemTimeDiff.component";
import { BadgeDollarSign, Clock, Star } from "lucide-react";

export const ListItemInfo = ({
  isComplete,
  date,
  diff,
  score,
  incomeAmount,
  outcomeAmount,
  total,
  hasShare,
  priceOfProduct,
  drawerType,
}: {
  isComplete?: boolean;
  date?: string | number;
  diff?: duration.Duration;
  score?: number;
  incomeAmount?: string;
  outcomeAmount?: string;
  total?: number;
  hasShare?: boolean;
  priceOfProduct?: string;
  drawerType: string;
}) => {
  return (
    <div className="flex flex-col w-fit gap-y-1 justify-end items-end">
      {drawerType == "Habbits" && (
        <label
          className={cn(
            "cursor-pointer px-2 py-1 rounded-2xl",
            score &&
              (score == 0
                ? "text-white"
                : score > 6
                  ? "text-successGreen"
                  : "text-errorRed")
          )}
        >
          <div className="flex flex-row items-center gap-x-0.5">
            <Star width={16} height={16} />
            {score}
          </div>
        </label>
      )}
      <label
        className={cn(
          `cursor-pointer px-2 py-1 rounded-2xl text-white`,
          date && date && DayUnixDiff(+date, "hour") > 1
            ? "text-successGreen"
            : "text-errorRed",
          incomeAmount && "text-successGreen",
          priceOfProduct && "text-errorRed"
        )}
      >
        <div dir="ltr" className="flex flex-row items-center gap-x-1">
          <Clock width={12} height={12} />
          {date && DayUnixFormat(+date, "HH:mm")}{" "}
          {drawerType == "Goals" && (
            <>
              {!isComplete && ` | `}
              <Star width={16} height={16} />
              {score}
            </>
          )}
          {(incomeAmount || priceOfProduct || outcomeAmount) && (
            <>
              {(incomeAmount || priceOfProduct || outcomeAmount) && ` | `}
              <BadgeDollarSign width={16} height={16} />
              {`${incomeAmount || priceOfProduct || outcomeAmount}`}
            </>
          )}
        </div>
      </label>

      {drawerType == "Friends" && hasShare && (
        <label
          className={cn(
            "cursor-pointer px-2 py-1 rounded-2xl",
            !total ? "text-white" : total > 0 ? "text-success" : "text-error"
          )}
        >
          <div className="flex gap-x-1 items-center">
            <BadgeDollarSign width={16} height={16} />
            <label>{total}</label>
          </div>
        </label>
      )}
      {drawerType == "Timers" && !isComplete && date && (
        <ListItemTimeDiff date={date} />
      )}
      {drawerType == "Timers" && isComplete && diff && (
        <label
          className={cn(`cursor-pointer px-2 py-1 rounded-2xl text-white`)}
        >
          {diff.years() > 0 && `${diff.years()} : `}
          {diff.months() > 0 && `${diff.months()} : `}
          {diff.days() > 0 && `${diff.days()} : `}
          {diff.hours() > 0 && `${diff.hours()} : `}
          {diff.minutes() > 0 && `${diff.minutes()} : `}
          {diff.seconds() < 10 ? `0${diff.seconds()}` : `${diff.seconds()}`}
        </label>
      )}
      {/* {drawerType !== "Habbits" &&
        drawerType !== "Visits" &&
        drawerType !== "Goals" &&
        drawerType != "Spends" &&
        drawerType != "Timers" &&
        drawerType != "Shares" &&
        date && (
          <label
            className={cn(
              "cursor-pointer px-2 py-1 rounded-2xl text-white",
              date && DayUnixDiff(+date, "day") > -1
                ? "text-successGreen"
                : "text-errorRed"
            )}
          >
            {date && DayUnixFormat(+date, "YYYY-MM-DD")}
          </label>
        )} */}
    </div>
  );
};

export default ListItemInfo;
