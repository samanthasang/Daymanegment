"use client";
import useShareList from "@/lib/Hooks/Lists/UseShareList.component";
import { cn } from "@/lib/utils";
import { TShare } from "@/modules/share/share.slice";
import ShareItem from "../ShareItem/ShareItem.component";

function ShareList({ peopleId }: { peopleId: string }) {
  const ListShare = useShareList();

  const peopleAcoreToId =
    ListShare && ListShare.filter((share) => share.peopleId == peopleId);

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-3 col-span-2 h-auto",
        peopleAcoreToId && peopleAcoreToId.length !== 0
          ? "scroll-m-0 overflow-y-scroll"
          : ""
      )}
    >
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
        {peopleAcoreToId?.length == 0 ? (
          <div className="flex items-center justify-center rounded-2xl h-full">
            <span>There is nothing to show</span>
          </div>
        ) : (
          peopleAcoreToId?.map((li: TShare) => (
            <ShareItem key={li.id} item={li} />
          ))
        )}
      </div>
    </div>
  );
}

export default ShareList;
