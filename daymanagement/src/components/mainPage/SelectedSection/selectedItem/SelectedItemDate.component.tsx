import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import SelectedItemContainer from "./SelectedItemContainer.component";

export const SelectedItemDate = ({
  doDate,
  createDate,
  time,
  lastUpdate,
  timeDiff,
  priodDiff,
  completeUpdate,
  startDate,
  endDate,
  birthDate,
}: {
  doDate?: number;
  createDate?: number;
  time?: string;
  lastUpdate?: number;
  timeDiff?: string;
  priodDiff?: string;
  completeUpdate?: number;
  startDate?: number;
  endDate?: number;
  birthDate?: number;
}) => {
  return (
    <>
      {(!!doDate || !!createDate) && (
        <div className="w-full flex flex-row justify-between gap-x-3">
          {!!createDate && (
            <SelectedItemContainer
              title="Create Date"
              description={DayUnixFormat(createDate, "YYYY-MM-DD")}
            />
          )}
          {!!doDate && (
            <SelectedItemContainer
              title="Do Date"
              description={DayUnixFormat(doDate, "YYYY-MM-DD")}
            />
          )}
        </div>
      )}
      {(!!startDate ||
        !!lastUpdate ||
        !!completeUpdate ||
        !!birthDate ||
        !!endDate) && (
        <div className="w-full flex flex-row justify-between gap-x-3">
          {startDate && (
            <SelectedItemContainer
              title="Start Date"
              description={DayUnixFormat(startDate, "YYYY-MM-DD")}
            />
          )}
          {endDate && (
            <SelectedItemContainer
              title="End Date"
              description={DayUnixFormat(endDate, "YYYY-MM-DD")}
            />
          )}
          {lastUpdate && (
            <SelectedItemContainer
              title="Lastupdate"
              description={DayUnixFormat(lastUpdate, "YYYY-MM-DD")}
            />
          )}
          {completeUpdate && (
            <SelectedItemContainer
              title="Complete"
              description={DayUnixFormat(completeUpdate, "YYYY-MM-DD")}
            />
          )}
          {birthDate && (
            <SelectedItemContainer
              title="BirthDate"
              description={DayUnixFormat(birthDate, "YYYY-MM-DD")}
            />
          )}
        </div>
      )}
      {time && (
        <SelectedItemContainer
          title="Do Time"
          description={DayUnixFormat(+time, "hh:mm")}
        />
      )}
      {timeDiff && (
        <SelectedItemContainer
          title="Reminde After"
          description={`${timeDiff} ${priodDiff}s`}
        />
      )}
    </>
  );
};

export default SelectedItemDate;
