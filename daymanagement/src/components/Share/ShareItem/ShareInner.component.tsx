"use client";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import { TShare } from "@/modules/share/share.slice";
import ShareItemInner from "./ShareItemInner.component";

function PeopleShareList({ peopleId }: { peopleId: string }) {
  const { ListShareAll } = useShareList();

  const peopleAcoreToId =
    ListShareAll && ListShareAll.filter((share) => share.peopleId == peopleId);

  return (
    <div className="flex flex-col gap-4 w-full h-auto">
      {peopleAcoreToId?.length == 0 ? (
        <div className="flex items-center justify-center rounded-2xl h-full">
          <span>There is nothing to show</span>
        </div>
      ) : (
        peopleAcoreToId?.map((li: TShare) => (
          <ShareItemInner key={li.id} item={li} />
        ))
      )}
    </div>
  );
}

export default PeopleShareList;
