"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeVisitList,
  delVisitList,
  selectVisitList,
  setVisitList,
  TVisit,
  updateVisitList,
} from "@/modules/visitsList/visit.slice";
import { toast } from "react-toastify";
import useVisitList from "./UseVisitList.component";
import { currentUnixTimestamp, DayUnixAdd } from "../../UseDayJS";
import { nanoid } from "@reduxjs/toolkit";

function VisitListActivities() {
  const dispatch = useAppDispatch();

  const { selectedVisit } = useVisitList();

  const SelectItem = () => {
    dispatch(selectVisitList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectVisitList(id));
  };
  const DelItem = (id: string, title: string) => {
    dispatch(delVisitList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeVisitList(id));
    id && selectedVisit && dispatch(selectVisitList(id));
    toast(`${title} is updated`);
  };
  const BringTodayItem = (item: TVisit) => {
    dispatch(updateVisitList({ ...item, doDate: currentUnixTimestamp }));
    item.id && selectedVisit && dispatch(selectVisitList(item.id));
    toast(`${item.title} is updated`);
  };
  const DuplicateTodayItem = (item: TVisit) => {
    dispatch(
      setVisitList({
        ...item,
        id: nanoid(),
        title: `${item.title} copy`,
        doDate: currentUnixTimestamp,
        createDate: currentUnixTimestamp,
      })
    );
    item.id && selectedVisit && dispatch(selectVisitList(item.id));
    toast(`${item.title} is updated`);
  };
  const AddDayToItem = (item: TVisit, day: number) => {
    dispatch(
      updateVisitList({
        ...item,
        doDate: DayUnixAdd(item.doDate, "day", day),
        createDate: item.createDate ?? currentUnixTimestamp,
      })
    );
    item.id && selectedVisit && dispatch(selectVisitList(item.id));
    toast(`${item.title} is updated`);
  };
  const PaymentCompleteItem = (item: TVisit) => {
    dispatch(
      updateVisitList({
        ...item,
        advancePayment: item.paymentCompleteValue,
      })
    );
    item.id && selectedVisit && dispatch(selectVisitList(item.id));
    toast(`${item.title} is updated`);
  };
  return {
    CompleteItem,
    DelItem,
    SelectWithId,
    SelectItem,
    BringTodayItem,
    DuplicateTodayItem,
    AddDayToItem,
    PaymentCompleteItem,
  };
}

export default VisitListActivities;
