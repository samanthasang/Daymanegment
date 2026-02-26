"use client";

import { useAppSelector } from "@/lib/hook";
import { TPeople } from "@/modules/people/PeopleList.slice";
import { useParams } from "next/navigation";
import ShareList from "./ShareList/ShareList.component";
import ShareSideBar from "./ShareFilter/ShareSideBar.componen";

function PeopleShareListComponent() {
  const { peopleId } = useParams();
  console.log(peopleId);

  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.PeopleList) || {};
  const peopleAcoreToId = ListPeople.filter((share) => share.id == peopleId)[0];

  return (
    <div className="w-full lg:w-2/3 m-auto bg-secondary flex flex-col h-full">
      <div className="w-full text-center border-b p-3">
        {(peopleAcoreToId && peopleAcoreToId.title) || ""}
      </div>
      <div className=" w-full grid grid-cols-3 h-5 flex-1">
        <ShareSideBar />

        <ShareList peopleId={peopleId as string} />
      </div>
    </div>
  );
}

export default PeopleShareListComponent;
