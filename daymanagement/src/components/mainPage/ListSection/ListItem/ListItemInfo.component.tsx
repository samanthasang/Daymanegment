import { DayUnixDiff, DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import duration from "dayjs/plugin/duration";
import ListItemTimeDiff from "./ListItemTimeDiff.component";

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
      {drawerType == "Goals" && (
        <label
          className={cn(
            `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
            score && (score > 5 ? "bg-success" : "bg-error")
          )}
        >
          {!isComplete && date && DayUnixFormat(+date, "MM-DD")}
          {!isComplete && ` | `}
          {score && score}
        </label>
      )}
      {drawerType == "Habbits" && (
        <label
          className={cn(
            `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
            score &&
              (score == 0
                ? "bg-white/80"
                : score > 6
                  ? "bg-success"
                  : "bg-error")
          )}
        >
          {score && score}
        </label>
      )}
      {drawerType == "Visits" && (
        <label
          className={cn(
            `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
            date
              ? "bg-white/15"
              : date && DayUnixDiff(+date, "day") > 10
                ? "bg-success"
                : "bg-error",
            incomeAmount && "bg-success",
            priceOfProduct && "bg-error"
          )}
        >
          {date && DayUnixFormat(+date, "MM-DD HH:mm")}
        </label>
      )}
      {drawerType == "Friends" && hasShare && (
        <label
          className={cn(
            "cursor-pointer px-2 py-1 rounded-2xl",
            !total ? "bg-white/15" : total > 0 ? "bg-success" : "bg-error"
          )}
        >
          {total}
        </label>
      )}
      {(incomeAmount || priceOfProduct || outcomeAmount) && (
        <label
          className={cn(
            `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
            incomeAmount
              ? "bg-success"
              : (priceOfProduct || outcomeAmount) && "bg-error"
          )}
        >
          {date && DayUnixFormat(+date, "MM-DD")}
          {(incomeAmount || priceOfProduct || outcomeAmount) && ` | `}
          {`${incomeAmount || priceOfProduct || outcomeAmount}`}
        </label>
      )}
      {drawerType == "Timers" && !isComplete && date && (
        <ListItemTimeDiff date={date} />
      )}
      {drawerType == "Timers" && isComplete && diff && (
        <label
          className={cn(`cursor-pointer px-2 py-1 rounded-2xl bg-white/15`)}
        >
          {diff.years() > 0 && `${diff.years()} : `}
          {diff.months() > 0 && `${diff.months()} : `}
          {diff.days() > 0 && `${diff.days()} : `}
          {diff.hours() > 0 && `${diff.hours()} : `}
          {diff.minutes() > 0 && `${diff.minutes()} : `}
          {diff.seconds() < 10 ? `0${diff.seconds()}` : `${diff.seconds()}`}
        </label>
      )}
      {drawerType !== "Habbits" &&
        drawerType !== "Visits" &&
        drawerType !== "Goals" &&
        drawerType != "Spends" &&
        drawerType != "Timers" &&
        drawerType != "Shares" &&
        date && (
          <label
            className={cn(
              `cursor-pointer px-2 py-1 rounded-2xl bg-white/15`,
              date && DayUnixDiff(+date, "day") > -1 ? "bg-success" : "bg-error"
            )}
          >
            {date && DayUnixFormat(+date, "MM-DD")}
          </label>
        )}
    </div>
  );
};

export default ListItemInfo;
