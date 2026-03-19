"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ComplateFIlter.component";
import FinishedFIlter from "@/lib/Hooks/FinishedFIlter.componen";
import LastDateOrderFilter from "@/lib/Hooks/LastDateOrderFilter.component";
import { cn } from "@/lib/utils";
import { TInstallmentsts } from "@/modules/installmentstList/installmentst.slice";
import InstallmentsItem from "../InstallmentsItem/Installments.component";

function InstallmentsListCurrent({
  ListInstallments,
  selectedID,
}: {
  ListInstallments: TInstallmentsts[];
  selectedID: string;
}) {
  const { LastDateOrderArray, lastDateFilter } =
    LastDateOrderFilter(ListInstallments);

  const { finishArray, finishFIlter, setFinishFIlter } = lastDateFilter
    ? FinishedFIlter([...LastDateOrderArray] as any)
    : ([...ListInstallments] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    finishArray && finishFIlter
      ? ComplateFIlter([...finishArray] as any)
      : ComplateFIlter([...ListInstallments] as any);

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full gap-y-2",
          (complateArray && complateArray.length !== 0) || false
            ? "scroll-m-0 overflow-y-scroll"
            : ""
        )}
      >
        {complateArray?.length == 0 ? (
          <EmptyList />
        ) : (
          complateArray?.map((li: TInstallmentsts) => (
            <InstallmentsItem key={li.id} item={li} selectedID={selectedID} />
          ))
        )}
      </div>
      <ListMenuBottom
        listTitle="Installments"
        drawerType="InstallmentsList"
        formType="Edit Installment"
        selectedID={!!selectedID}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFIlter}
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangeDate={() => setFinishFIlter(!finishFIlter)}
        ListInfo={`${complateArray?.filter((todo) => todo.isComplete == true).length} / ${complateArray?.length}`}
      />
    </>
  );
}

export default InstallmentsListCurrent;
