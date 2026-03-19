"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import {
  selectVisitList,
  TVisit
} from "@/modules/visitsList/visit.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import SelectedVisitssList from "../VisitsItem/SelectedVisitssList.component";
import VisitssListCurrent from "./VisitssListCurrent.componen";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function VisitsList() {
  const dispatch = useAppDispatch();
  const [forgot, setForgot] = useState(false);

  const Visit = useAppSelector((state) => state.visit);

  const selectedVisit = Visit?.selectedVisit as TVisit;

  const ListVisit = useVisitList();
  const ListVisitAll = Visit?.ListVisit as TVisit[];
  const ListVisitForgot = ListVisitAll.filter(
    (a) =>
      dayjs(dayjs.unix(Number(a.date))) <
      dayjs(dayjs.unix(Number(currentUnixTimestamp)))
  );

  useEffect(() => {
    ListVisit.length == 0 && dispatch(selectVisitList(""));
  }, [ListVisit]);

  useEffect(() => {
    ListVisit.length == 0 && dispatch(selectVisitList(""));
  }, [ListVisit]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedVisit}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Visits"
        />
        {!forgot ? (
          <VisitssListCurrent
            ListVisit={ListVisit}
            selectedID={selectedVisit && selectedVisit.id}
          />
        ) : (
          <VisitssListCurrent
            ListVisit={ListVisitForgot}
            selectedID={selectedVisit && selectedVisit.id}
          />
        )}
      </ListContainer>
      {selectedVisit && <SelectedVisitssList />}
    </div>
  );
}

export default VisitsList;
