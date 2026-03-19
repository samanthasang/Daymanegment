"use client";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import {
  completeVisitList,
  delVisitList,
  selectVisitList,
  TVisit,
} from "@/modules/visitsList/visit.slice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function SelectedVisitssList() {
  const dispatch = useAppDispatch();

  const ListVisit = useVisitList();
  const Visit = useAppSelector((state) => state.visit);

  const selectedVisit = Visit?.selectedVisit as TVisit;

  useEffect(() => {
    ListVisit.length == 0 && dispatch(selectVisitList(""));
  }, [ListVisit]);

  const SelectItem = () => {
    dispatch(selectVisitList(""));
  };
  const DelItem = () => {
    dispatch(delVisitList(selectedVisit.id));
    toast(`${selectedVisit.title} is deleted`);
  };
  const CompleteItemt = () => {
    dispatch(completeVisitList(selectedVisit.id));
    selectedVisit.isComplete
      ? toast(`${selectedVisit.title} is uncompleted`)
      : toast(`${selectedVisit.title} is completed`);
  };
  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
      <SelectedItem CompleteItemt={CompleteItemt} {...selectedVisit} />
      <SelectedMenuBottom
        CompleteItemt={CompleteItemt}
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="VisitsList"
        formType="Edit Visit"
        selectedIsComplete={selectedVisit.isComplete}
      />
    </div>
  );
}

export default SelectedVisitssList;
