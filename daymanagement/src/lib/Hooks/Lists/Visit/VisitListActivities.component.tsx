"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeVisitList,
  delVisitList,
  selectVisitList,
} from "@/modules/visitsList/visit.slice";
import { toast } from "react-toastify";
import useVisitList from "./UseVisitList.component";

function VisitListActivities() {
  const dispatch = useAppDispatch();

  const { selectedVisit } = useVisitList();

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
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeVisitList(id));
    id && selectedVisit && dispatch(selectVisitList(id));
    toast(`${title} is updated`);
  };
  return { CompleteItem, DelItem, SelectWithId, SelectItem };
}

export default VisitListActivities;
