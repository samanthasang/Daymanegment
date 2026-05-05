import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import SelectedItemContainer from "./SelectedItemContainer.component";
import { Calendar, Clock, Timer } from "lucide-react";

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
            <SelectedItemContainer title="Create Date">
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(createDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {!!doDate && (
            <SelectedItemContainer title="Do Date">
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(doDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {birthDate && (
            <SelectedItemContainer title="BirthDate">
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(birthDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
        </div>
      )}
      {(!!startDate || !!lastUpdate || !!completeUpdate || !!endDate) && (
        <div className="w-full flex flex-row justify-between gap-x-3">
          {startDate && (
            <SelectedItemContainer title="Start Date">
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(startDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {endDate && (
            <SelectedItemContainer title="End Date">
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(endDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {lastUpdate && (
            <SelectedItemContainer title="Lastupdate">
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(lastUpdate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {completeUpdate && (
            <SelectedItemContainer
              title="Complete"
              description={DayUnixFormat(completeUpdate, "YYYY-MM-DD")}
            />
          )}
        </div>
      )}
      {time && (
        <SelectedItemContainer title="Do Time">
          <div className="flex flex-row items-center gap-x-1">
            <Clock width={12} height={12} />
            {DayUnixFormat(+time, "hh:mm")}
          </div>
        </SelectedItemContainer>
      )}
      {timeDiff && (
        <SelectedItemContainer title="Reminde After">
          <div className="flex flex-row items-center gap-x-1">
            <Timer width={12} height={12} />
            {`${timeDiff} ${priodDiff}s`}
          </div>
        </SelectedItemContainer>
      )}
    </>
  );
};

export default SelectedItemDate;
