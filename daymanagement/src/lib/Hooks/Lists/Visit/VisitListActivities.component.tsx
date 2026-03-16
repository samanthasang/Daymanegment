"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  selectSpendsList,
  TSpends
} from "@/modules/spends/spends.slice";
import {
  delVisitList,
  selectVisitList,
  TVisit,
} from "@/modules/visitsList/visit.slice";
import { toast } from "react-toastify";

function VisitListActivities() {
  const dispatch = useAppDispatch();

  const Visit = useAppSelector((state) => state.visit);

  const selectedVisit = Visit?.selectedVisit as TVisit;

  const SelectItem = () => {
    dispatch(selectVisitList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectVisitList(id));
  };
  const DelItem = () => {
    dispatch(delVisitList(selectedVisit.id));
    SelectItem();
    toast(`${selectedVisit.title} is deleted`);
  };
  return { DelItem, SelectWithId, SelectItem };
}

export default VisitListActivities;
