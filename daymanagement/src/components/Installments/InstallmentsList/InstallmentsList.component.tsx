"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import { cn } from "@/lib/utils";
import {
  selectInstallmentstList,
  TInstallmentsts,
} from "@/modules/installmentstList/installmentst.slice";
import { useEffect } from "react";
import InstallmentsItem from "../InstallmentsItem/Installments.component";
import InstallmentsListActivities from "@/lib/Hooks/Lists/Installments/InstallmentsListActivities.component";
import PriorityFilter from "@/lib/Hooks/PriorityFilter.component";
import DateFIlter from "@/lib/Hooks/ComplateReminderFIlter.component";
import FinishedFIlter from "@/lib/Hooks/FinishedFIlter.componen";

function InstallmentsList() {
  const dispatch = useAppDispatch();

  const ListInstallments = useInstallmentsList();
  const Installmentst = useAppSelector((state) => state.InstallmentstList);

  const { CompleteItemt, DelItem, SelectItem, SelectWithId } =
    InstallmentsListActivities();

  const selectedInstallmentstList =
    Installmentst?.selectedInstallmentst as TInstallmentsts;

  const { priorityArray, priorityFilter, setPriorityFilter } = PriorityFilter(
    ListInstallments as any
  );

  const { dateArray, dateFIlter, setDateFIlter } =
    priorityArray && priorityFilter
      ? DateFIlter([...priorityArray] as any)
      : DateFIlter([...ListInstallments] as any);

  const { finishArray, finishFIlter, setFinishFIlter } =
    priorityArray && priorityFilter
      ? FinishedFIlter([...dateArray] as any)
      : FinishedFIlter([...ListInstallments] as any);

  useEffect(() => {
    ListInstallments.length == 0 && dispatch(selectInstallmentstList(""));
  }, [ListInstallments]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer
        listTitle="Installments"
        selectedID={!!selectedInstallmentstList}
        // ListInfo={`${ListInstallments?.length}`}
        // scrollOn={(ListInstallments && ListInstallments.length !== 0) || false}
      >
        <div
          className={cn(
            "flex flex-col h-full gap-y-2",
            (ListInstallments && ListInstallments.length !== 0) || false
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListInstallments?.length == 0 ? (
            <EmptyList />
          ) : (
            ListInstallments?.map((li: TInstallmentsts) => (
              <InstallmentsItem
                key={li.id}
                item={li}
                selectedID={
                  selectedInstallmentstList && selectedInstallmentstList.id
                }
              />
            ))
          )}
        </div>
        <ListMenuBottom
          listTitle="Installments"
          drawerType="InstallmentsList"
          formType="Edit Installment"
          selectedID={!!selectedInstallmentstList}
          withpriority
          withcomplate
          withdate
          priorityFilter={priorityFilter}
          dateFIlter={!finishFIlter}
          complateFIlter={dateFIlter}
          ChangeDate={() => setFinishFIlter(!finishFIlter)}
          ChangeComplate={() => setDateFIlter(!dateFIlter)}
          ChangePriority={() => setPriorityFilter(!priorityFilter)}
          ListInfo={`${ListInstallments?.length}`}
        />
      </ListContainer>
      {selectedInstallmentstList && (
        <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
          <SelectedItem
            // CompleteItemt={() =>
            //   CompleteItemt(
            //     selectedInstallmentstList.id,
            //     selectedInstallmentstList.title,
            //     selectedInstallmentstList.startDate
            //   )
            // }
            date={
              selectedInstallmentstList.installmentstList.filter(
                (ins) => !ins.isComplete
              )[0]
                ? selectedInstallmentstList.installmentstList.filter(
                    (ins) => !ins.isComplete
                  )[0].date
                : selectedInstallmentstList.lastUpdate
            }
            {...selectedInstallmentstList}
          />
          <SelectedMenuBottom
            CompleteItemt={() =>
              CompleteItemt(
                selectedInstallmentstList.id,
                selectedInstallmentstList.title,
                selectedInstallmentstList.startDate
              )
            }
            DelItem={DelItem}
            SelectItem={SelectItem}
            drawerType="InstallmentsList"
            formType="Edit Installment"
            selectedIsComplete={selectedInstallmentstList.isComplete}
          />
        </div>
      )}
    </div>
  );
}

export default InstallmentsList;
