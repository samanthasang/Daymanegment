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
      {!!createDate && (
        <SelectedItemContainer title={t.CreateDay}>
          <div className="w-full flex flex-row justify-between gap-x-2" dir="ltr">
            <div className="flex flex-row items-center gap-x-1">
              <Calendar width={12} height={12} />
              {DayUnixFormat(createDate, "YYYY-MM-DD")}
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <Clock width={12} height={12} />
              {DayUnixFormat(createDate, "HH:mm")}
            </div>
          </div>
        </SelectedItemContainer>
      )}
      {!!doDate && (
        <SelectedItemContainer title={t.DoDay}>
          <div className="w-full flex flex-row justify-between gap-x-2" dir="ltr">
            <div className="flex flex-row items-center gap-x-1">
              <Calendar width={12} height={12} />
              {DayUnixFormat(doDate, "YYYY-MM-DD")}
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <Clock width={12} height={12} />
              {DayUnixFormat(doDate, "HH:mm")}
            </div>
          </div>
        </SelectedItemContainer>
      )}
      {birthDate && (
        <SelectedItemContainer title={t.BirthDay}>
          <div className="flex flex-row items-center gap-x-1" dir="ltr">
            <Calendar width={12} height={12} />
            {DayUnixFormat(birthDate, "YYYY-MM-DD")}
          </div>
        </SelectedItemContainer>
      )}
      {startDate && (
        <SelectedItemContainer title={t.StartDay}>
          <div className="w-full flex flex-row justify-between gap-x-2" dir="ltr">
            <div className="flex flex-row items-center gap-x-1">
              <Calendar width={12} height={12} />
              {DayUnixFormat(startDate, "YYYY-MM-DD")}
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <Clock width={12} height={12} />
              {DayUnixFormat(startDate, "HH:mm")}
            </div>
          </div>
        </SelectedItemContainer>
      )}
      {endDate && (
        <SelectedItemContainer title={t.EndDay}>
          <div className="w-full flex flex-row justify-between gap-x-2" dir="ltr">
            <div className="flex flex-row items-center gap-x-1">
              <Calendar width={12} height={12} />
              {DayUnixFormat(endDate, "YYYY-MM-DD")}
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <Clock width={12} height={12} />
              {DayUnixFormat(endDate, "HH:mm")}
            </div>
          </div>
        </SelectedItemContainer>
      )}
      {lastUpdate && (
        <SelectedItemContainer title={t.LastUpdate}>
          <div className="w-full flex flex-row justify-between gap-x-2" dir="ltr">
            <div className="flex flex-row items-center gap-x-1">
              <Calendar width={12} height={12} />
              {DayUnixFormat(lastUpdate, "YYYY-MM-DD")}
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <Clock width={12} height={12} />
              {DayUnixFormat(lastUpdate, "HH:mm")}
            </div>
          </div>
        </SelectedItemContainer>
      )}
      {completeUpdate && (
        <SelectedItemContainer title={t.CompleteDay}>
          <div className="w-full flex flex-row justify-between gap-x-2" dir="ltr">
            <div className="flex flex-row items-center gap-x-1">
              <Calendar width={12} height={12} />
              {DayUnixFormat(completeUpdate, "YYYY-MM-DD")}
            </div>
            <div className="flex flex-row items-center gap-x-1">
              <Clock width={12} height={12} />
              {DayUnixFormat(completeUpdate, "HH:mm")}
            </div>
          </div>
        </SelectedItemContainer>
      )}
      {time && (
        <SelectedItemContainer title={t.DoHour}>
          <div className="flex flex-row items-center gap-x-1" dir="ltr">
            <Clock width={12} height={12} />
            {DayUnixFormat(+time, "HH:mm")}
          </div>
        </SelectedItemContainer>
      )}
      {timeDiff && (
        <SelectedItemContainer title={t.ReminderAfter}>
          <div className="flex flex-row items-center gap-x-1" dir="ltr">
            <Timer width={12} height={12} />
            {`${timeDiff} ${priodDiff}s`}
          </div>
        </SelectedItemContainer>
      )}
    </>
  );
};

export default SelectedItemDate;
