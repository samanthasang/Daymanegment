"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import { selectSpendsList, TSpends } from "@/modules/spends/spends.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import SelectedSpendsList from "../SpendsItem/SelectedSpendsList.component";
import SpendsListCurrent from "./SpendsListCurrent.component";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function SpendsList() {
  const dispatch = useAppDispatch();

  const [forgot, setForgot] = useState(false);

  const Spends = useAppSelector((state) => state.SpendsList);

  const selectedSpends = Spends?.selectedSpends as TSpends;

  const ListSpends = useSpendsList();
  const ListSpendsAll = Spends?.ListSpends as TSpends[];
  const ListSpendsForgot = ListSpendsAll.filter(
    (a) =>
      dayjs(dayjs.unix(Number(a.date))) <
      dayjs(dayjs.unix(Number(currentUnixTimestamp)))
  );

  useEffect(() => {
    ListSpends.length == 0 && dispatch(selectSpendsList(""));
  }, [ListSpends]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedSpends}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Spends"
        />
        {!forgot ? (
          <SpendsListCurrent
            ListSpends={ListSpends}
            selectedID={selectedSpends && selectedSpends.id}
          />
        ) : (
          <SpendsListCurrent
            ListSpends={ListSpendsForgot}
            selectedID={selectedSpends && selectedSpends.id}
          />
        )}
      </ListContainer>
      {selectedSpends && <SelectedSpendsList />}
    </div>
  );
}

export default SpendsList;
