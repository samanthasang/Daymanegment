import { DayUnixFormat } from "@/lib/Hooks/UseDayJS";
import SelectedItemContainer from "./SelectedItemContainer.component";
import { Calendar, Clock, Timer } from "lucide-react";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";

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
  const t: any = UseLangComponent("Selected");
  return (
    <>
      {(!!doDate || !!createDate) && (
        <div className="w-full flex flex-row justify-between gap-x-2">
          {!!createDate && (
            <SelectedItemContainer title={t.CreateDay}>
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(createDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {!!doDate && (
            <SelectedItemContainer title={t.DoDay}>
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(doDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {birthDate && (
            <SelectedItemContainer title={t.BirthDay}>
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(birthDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
        </div>
      )}
      {(!!startDate || !!lastUpdate || !!endDate) && (
        <div className="w-full flex flex-row justify-between gap-x-2">
          {startDate && (
            <SelectedItemContainer title={t.StartDay}>
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(startDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {endDate && (
            <SelectedItemContainer title={t.EndDay}>
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(endDate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
          {lastUpdate && (
            <SelectedItemContainer title={t.UpdateDay}>
              <div className="flex flex-row items-center gap-x-1">
                <Calendar width={12} height={12} />
                {DayUnixFormat(lastUpdate, "YYYY-MM-DD")}
              </div>
            </SelectedItemContainer>
          )}
        </div>
      )}
      {completeUpdate && (
        <SelectedItemContainer title={t.CompleteDay}>
          <div className="flex flex-row items-center gap-x-1">
            <Calendar width={12} height={12} />
            {DayUnixFormat(completeUpdate, "YYYY-MM-DD")}
          </div>
        </SelectedItemContainer>
      )}
      {time && (
        <SelectedItemContainer title={t.DoHour}>
          <div className="flex flex-row items-center gap-x-1">
            <Clock width={12} height={12} />
            {DayUnixFormat(+time, "HH:mm")}
          </div>
        </SelectedItemContainer>
      )}
      {timeDiff && (
        <SelectedItemContainer title={t.ReminderAfter}>
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
