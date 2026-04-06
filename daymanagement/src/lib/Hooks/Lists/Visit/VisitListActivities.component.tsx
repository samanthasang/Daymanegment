"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import {
  completeVisitList,
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
  const CompleteItemt = (id: string, title: string) => {
    dispatch(completeVisitList(id));
    id && selectedVisit && dispatch(selectVisitList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItemt, DelItem, SelectWithId, SelectItem };
}

export default VisitListActivities;
