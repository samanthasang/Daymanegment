"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import {
  completeVisitList,
  delVisitList,
  selectVisitList,
  TVisit,
} from "@/modules/visitsList/visit.slice";
import VisitsItem from "../VisitsItem/VisitsItem.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";

function VisitsList() {
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
    // selectedVisit.isComplete
    //   ? toast(`${selectedVisit.title} is uncompleted`)
    //   : toast(`${selectedVisit.title} is completed`);
  };

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer listTitle="Visits" selectedID={!!selectedVisit}>
        <div
          className={cn(
            "flex flex-col h-full gap-y-2",
            (ListVisit && ListVisit.length !== 0) || false
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListVisit?.length == 0 ? (
            <EmptyList />
          ) : (
            ListVisit?.map((li: TVisit) => (
              <VisitsItem
                key={li.id}
                item={li}
                selectedID={selectedVisit && selectedVisit.id}
              />
            ))
          )}
        </div>
        <ListMenuBottom
          listTitle="Visits"
          drawerType="VisitsList"
          formType="Add Visit"
          selectedID={!!selectedVisit}
          ListInfo={`${ListVisit && ListVisit.length}`}
        />
      </ListContainer>
      {selectedVisit && (
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
      )}
    </div>
  );
}

export default VisitsList;
