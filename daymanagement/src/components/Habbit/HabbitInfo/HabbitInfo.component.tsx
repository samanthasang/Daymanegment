"use client";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import FinishedArray from "@/lib/Hooks/ListInfo/FinishedArray.componen";
import NotFinishedArray from "@/lib/Hooks/ListInfo/NotFinishedArray.componen";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { useState } from "react";

function HabbitInfo() {
  const [forgot, setForgot] = useState(false);
  const { ListHabbitNew, ListMyHabbit } = UseHabbitList();

  const HabbitLenght = ListMyHabbit.length;
  const HabbitFinishLenght = NotFinishedArray(ListMyHabbit).length;
  const HabbitNotFinishLenght = FinishedArray(ListMyHabbit).length;

  const OldHabbitLenght = ListHabbitNew.length;
  const OldHabbitFinishLenght = NotFinishedArray(ListHabbitNew).length;
  const OldHabbitNotFinishLenght = FinishedArray(ListHabbitNew).length;

  return (
    <div className="w-full min-w-96 flex flex-col gap-y-2">
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={"Habbit"}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={"New Habbit"}
        />
      </ListTitleContainer>
      <div className="flex justify-between items-center bg-primary py-1 px-3 rounded-3xl">
        <span>All Habbit :</span>
        {!forgot ? HabbitLenght : OldHabbitLenght}
      </div>
      <div className="flex justify-between items-center text-blue-500 bg-primary py-1 px-3 rounded-3xl">
        <span>Done Status :</span>
        <div className="flex justify-center items-center w-fit h-2 text-blue-500 bg-primary py-1 gap-x-0.5">
          <span className="text-successGreen border-r-[1px] pr-1 border-blue-500">
            {!forgot ? HabbitFinishLenght : OldHabbitFinishLenght}
          </span>
          <span className="text-errorRed">
            {!forgot ? HabbitNotFinishLenght : OldHabbitNotFinishLenght}
          </span>
        </div>
      </div>
    </div>
  );
}

export default HabbitInfo;
