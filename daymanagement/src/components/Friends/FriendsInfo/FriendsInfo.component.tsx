"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import usePeopleList from "@/lib/Hooks/Lists/Friends/UsePeopleList.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import { cn } from "@/lib/utils";
import { CircleDollarSign } from "lucide-react";
import { useState } from "react";

function FriendsInfo() {
  const [forgot, setForgot] = useState(false);
  const { listHasNoShare, listHasShare } = usePeopleList();
  const { ListShareAll: ListShare } = useShareList();

  const FriendsLenght = listHasShare.length;
  const NewFriendsLenght = listHasNoShare.length;

  const incomeAmount = listHasShare
    .map(
      (people) =>
        ListShare &&
        ListShare?.filter(
          (share) =>
            people &&
            people.shareList &&
            people.shareList.length > 0 &&
            people.shareList.includes(share.id)
        ).reduce((acc, obj) => {
          if (obj.income && obj.incomeAmount) {
            return acc + +obj.incomeAmount;
          }
          return acc;
        }, 0)
    )
    .reduce((acc, obj) => {
      if (obj > 0) {
        return acc + +obj;
      }
      return acc;
    }, 0);

  const outcomeAmount = listHasShare
    .map(
      (people) =>
        ListShare &&
        ListShare?.filter((share) =>
          people.shareList.includes(share.id)
        ).reduce((acc, obj) => {
          if (!obj.income && obj.outcomeAmount) {
            return acc - +obj.outcomeAmount;
          }
          return acc;
        }, 0)
    )
    .reduce((acc, obj) => {
      if (obj < 0) {
        return acc - +obj;
      }
      return acc;
    }, 0);

  return (
    <div className="w-full min-w-96 flex flex-col gap-y-2">
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={"Friends"}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={"Old Friends"}
        />
      </ListTitleContainer>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>Friends With Share :</span>
        {FriendsLenght}
      </div>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>Friends Without Share :</span>
        {NewFriendsLenght}
      </div>
      <div className="flex justify-between items-center text-successGreen bg-primary py-1 px-3 rounded-3xl">
        <span>Income Amount :</span>
        <div className="flex justify-center items-center w-fit h-2 bg-primary py-1 gap-x-0.5">
          <CircleDollarSign width={16} height={16} />
          <span>{incomeAmount}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-errorRed bg-primary py-1 px-3 rounded-3xl">
        <span>Outcome Amount :</span>
        <div className="flex justify-center items-center w-fit h-2 bg-primary py-1 gap-x-0.5">
          <CircleDollarSign width={16} height={16} />
          <span>{outcomeAmount}</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>Total Amount :</span>
        <div
          className={cn(
            "flex justify-center items-center w-fit h-2  bg-primary py-1 gap-x-0.5",
            incomeAmount - outcomeAmount > 0
              ? "text-successGreen"
              : "text-errorRed"
          )}
        >
          <CircleDollarSign width={16} height={16} />
          <span>{incomeAmount - outcomeAmount}</span>
        </div>
      </div>
    </div>
  );
}

export default FriendsInfo;
