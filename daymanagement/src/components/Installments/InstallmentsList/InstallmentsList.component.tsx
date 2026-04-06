"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import useInstallmentsList from "@/lib/Hooks/Lists/Installments/UseInstallmentsList.component";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import SelectedInstallmentsList from "../InstallmentsItem/SelectedInstallmentsList.component";
import InstallmentsListCurrent from "./InstallmentsListCurrent.component";

function InstallmentsList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();

  const {
    ListInstallmentsFiltered,
    ListInstallmentsForgot,
    selectedInstallmentstList,
  } = useInstallmentsList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedInstallmentstList) || isSMMin) && (
        <ListContainer selectedID={!!selectedInstallmentstList}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Installments"
            listCount={
              ListInstallmentsFiltered.length > 0
                ? ListInstallmentsFiltered?.filter((item) => !item.isComplete)
                    .length
                : undefined
            }
            secListCount={
              ListInstallmentsForgot.length > 0
                ? ListInstallmentsForgot?.filter((item) => !item.isComplete)
                    .length
                : undefined
            }
          />
          {!forgot ? (
            <InstallmentsListCurrent
              ListInstallments={ListInstallmentsFiltered}
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
      )}
      {selectedInstallmentstList && <SelectedInstallmentsList />}
    </div>
  );
}

export default InstallmentsList;
