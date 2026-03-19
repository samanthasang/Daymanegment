"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import {
  selectInstallmentstList,
  TInstallmentsts,
} from "@/modules/installmentstList/installmentst.slice";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import SelectedInstallmentsList from "../InstallmentsItem/SelectedInstallmentsList.component";
import InstallmentsListCurrent from "./InstallmentsListCurrent.component";
dayjs.extend(relativeTime);
dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(timezone);

const currentUnixTimestamp = dayjs().unix();

function InstallmentsList() {
  const dispatch = useAppDispatch();
  const [forgot, setForgot] = useState(false);

  const Installmentst = useAppSelector((state) => state.InstallmentstList);

  const selectedInstallmentstList =
    Installmentst?.selectedInstallmentst as TInstallmentsts;

  const ListInstallments = useInstallmentsList();
  const ListInstallmentsAll =
    Installmentst?.ListInstallmentst as TInstallmentsts[];
  const ListInstallmentsForgot = ListInstallmentsAll.filter(
    (a) =>
      dayjs(
        dayjs.unix(
          Number(
            a.installmentstList.filter((ins) => !ins.isComplete)[0]
              ? a.installmentstList.filter((ins) => !ins.isComplete)[0].date
              : a.lastUpdate
          )
        )
      ) < dayjs(dayjs.unix(Number(currentUnixTimestamp)))
  );

  useEffect(() => {
    ListInstallments.length == 0 && dispatch(selectInstallmentstList(""));
  }, [ListInstallments]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedInstallmentstList}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Installments"
        />
        {!forgot ? (
          <InstallmentsListCurrent
            ListInstallments={ListInstallments}
            selectedID={
              selectedInstallmentstList && selectedInstallmentstList.id
            }
          />
        ) : (
          <InstallmentsListCurrent
            ListInstallments={ListInstallmentsForgot}
            selectedID={
              selectedInstallmentstList && selectedInstallmentstList.id
            }
          />
        )}
      </ListContainer>
      {selectedInstallmentstList && <SelectedInstallmentsList />}
    </div>
  );
}

export default InstallmentsList;
