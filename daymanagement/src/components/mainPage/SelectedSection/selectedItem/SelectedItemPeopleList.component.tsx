"use client";
import ShareItemInner from "@/components/Share/ShareItem/ShareItemInner.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import { cn } from "@/lib/utils";
import { TShare } from "@/modules/share/share.slice";
import SelectedItemContainer from "./SelectedItemContainer.component";
import { DollarSign } from "lucide-react";

export const SelectedItemPeopleList = ({ id }: { id: string }) => {
  const { ListShareAll } = useShareList();

  const ListShare =
    ListShareAll && ListShareAll.filter((share) => share.peopleId == id);

  console.log(ListShare);

  const incomeArray =
    id &&
    ListShare &&
    ListShare?.filter((share) => share.peopleId == id && share.income).reduce(
      (acc, obj) => {
        if (obj.income && obj.incomeAmount) {
          return acc + +obj.incomeAmount;
        }
        return acc;
      },
      0
    );
  const outComeArray =
    id &&
    ListShare &&
    ListShare?.filter((share) => share.peopleId == id && !share.income).reduce(
      (acc, obj) => {
        if (!obj.income && obj.outcomeAmount) {
          return acc + +obj.outcomeAmount;
        }
        return acc;
      },
      0
    );

  const total =
    id &&
    ListShare &&
    ListShare?.filter((share) => share.peopleId == id).reduce((acc, obj) => {
      if (obj.income && obj.incomeAmount) {
        return acc + +obj.incomeAmount;
      }
      if (!obj.income && obj.outcomeAmount) {
        return acc - +obj.outcomeAmount;
      }
      return acc;
    }, 0);
  return (
    <>
      <div className="w-full flex flex-row justify-between gap-x-2">
        <SelectedItemContainer title="Income Amount">
          <div className="flex flex-row items-center gap-x-0.5 text-successGreen">
            <DollarSign width={16} height={16} />
            {incomeArray || 0}
          </div>
        </SelectedItemContainer>
        <SelectedItemContainer title="Outcome Amount">
          <div className="flex flex-row items-center gap-x-0.5 text-errorRed">
            <DollarSign width={16} height={16} />
            {outComeArray || 0}
          </div>
        </SelectedItemContainer>
      </div>
      <SelectedItemContainer title="Total Amount">
        <div
          className={cn(
            "flex flex-row items-center gap-x-0.5",
            !total || total > 0 ? "text-successGreen" : "text-errorRed"
          )}
        >
          <DollarSign width={16} height={16} />
          {total}
        </div>
      </SelectedItemContainer>
      <SelectedItemContainer title="Share List">
        <div className="flex flex-col gap-4 w-full h-auto">
          {ListShare?.length == 0 ? (
            <div className="flex items-center justify-center rounded-2xl h-full">
              <span>There is nothing to show</span>
            </div>
          ) : (
            ListShare?.map((li: TShare) => (
              <ShareItemInner key={li.id} item={li} />
            ))
          )}
        </div>
      </SelectedItemContainer>
    </>
  );
};

export default SelectedItemPeopleList;
