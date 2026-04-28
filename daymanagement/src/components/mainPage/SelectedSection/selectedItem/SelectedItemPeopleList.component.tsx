"use client";
import PeopleShareList from "@/components/Share/ShareItem/ShareInner.component";
import SelectedItemContainer from "./SelectedItemContainer.component";

export const SelectedItemPeopleList = ({
  id,
  totalIncome,
  totalOuCome,
}: {
  id: string;
  totalIncome?: number;
  totalOuCome?: number;
}) => {
  return (
    <>
      <div className="w-full flex flex-row justify-between gap-x-3">
        {(totalIncome || totalIncome == 0) && (
          <SelectedItemContainer
            title="Income Amount"
            className={`${totalIncome && "text-success"}`}
            description={(!!totalIncome && totalIncome.toString()) || "0"}
          />
        )}
        {(totalOuCome || totalOuCome == 0) && (
          <SelectedItemContainer
            title="Outcome Amount"
            className={`${totalOuCome && "text-red-600"}`}
            description={(!!totalOuCome && totalOuCome.toString()) || "0"}
          />
        )}
      </div>
      <SelectedItemContainer title="Share List">
        <PeopleShareList peopleId={id} />
      </SelectedItemContainer>
    </>
  );
};

export default SelectedItemPeopleList;
