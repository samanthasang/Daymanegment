"use client";
import ListContent from "@/components/mainPage/ListContainer/ListContent.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import ComplateFIlter from "@/lib/Hooks/ListFilter/ComplateFIlter.component";
import FinishedFIlter from "@/lib/Hooks/Filters/FinishedFIlter.componen";
import LastDateOrderFilter from "@/lib/Hooks/ListFilter/LastDateOrderFilter.component";
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

  const { finishArray, finishFilter, setFinishFilter } = lastDateFilter
    ? FinishedFIlter([...LastDateOrderArray] as any)
    : FinishedFIlter([...ListInstallments] as any);

  const { complateArray, complateFIlter, setcomplateFIlter } =
    finishArray && finishFilter
      ? ComplateFIlter([...finishArray] as any)
      : ComplateFIlter([...ListInstallments] as any);

  return (
    <>
      <ListContent ListCount={complateArray.length}>
        {complateArray?.map((li: TInstallmentsts) => (
          <InstallmentsItem key={li.id} item={li} selectedID={selectedID} />
        ))}
      </ListContent>
      <ListMenuBottom
        listTitle="Installments"
        drawerType="InstallmentsList"
        formType="Add Installment"
        selectedID={!!selectedID}
        complateFIlter={complateFIlter}
        dateFIlter={!finishFilter}
        withcomplate
        withdate
        ChangeComplate={() => setcomplateFIlter(!complateFIlter)}
        ChangeDate={() => setFinishFilter(!finishFilter)}
        ListInfo={`${complateArray?.filter((todo) => todo.isComplete == true).length} / ${complateArray?.length}`}
      />
    </>
  );
}

export default InstallmentsListCurrent;
