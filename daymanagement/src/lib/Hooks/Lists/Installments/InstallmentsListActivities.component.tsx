"use client";
import { useAppDispatch } from "@/lib/hook";
import {
  completeInstallmentst,
  delInstallmentstList,
  selectInstallmentstList,
  unCompleteInstallmentst,
} from "@/modules/installmentstList/installmentst.slice";
import { toast } from "react-toastify";
import useInstallmentsList from "./UseInstallmentsList.component";

function InstallmentsListActivities() {
  const dispatch = useAppDispatch();

  const { selectedInstallmentstList } = useInstallmentsList();

  const SelectItem = () => {
    dispatch(selectInstallmentstList(""));
  };
  const SelectWithId = (id: string) => {
    dispatch(selectInstallmentstList(id));
  };
  const DelItem = (id: string, title: string) => {
    dispatch(delInstallmentstList(id));
    SelectItem();
    toast(`${title} is deleted`);
  };
  const CompleteItem = (id: string, title: string) => {
    dispatch(completeInstallmentst(id));
    id && selectedInstallmentstList && dispatch(selectInstallmentstList(id));
    toast(`${title} is updated`);
  };
  const UndoItem = (id: string, title: string) => {
    dispatch(unCompleteInstallmentst(id));
    id && selectedInstallmentstList && dispatch(selectInstallmentstList(id));
    toast(`${title} is updated`);
  };
  return {
    CompleteItem,
    DelItem,
    SelectWithId,
    SelectItem,
    UndoItem,
  };
}

export default InstallmentsListActivities;
