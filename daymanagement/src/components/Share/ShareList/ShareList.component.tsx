"use client";
import useShareList from "@/lib/Hooks/Lists/UseShareList.component";
import { cn } from "@/lib/utils";
import { TShare } from "@/modules/share/share.slice";
import { ShareItem } from "../ShareItem/ShareItem.component";

function ShareList() {
  const ListToDo = useShareList();

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-3 col-span-2 h-auto",
        ListToDo && ListToDo.length !== 0 ? "scroll-m-0 overflow-y-scroll" : ""
      )}
    >
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
        {ListToDo?.length == 0 ? (
          <div className="flex items-center justify-center rounded-2xl h-full">
            <span>There is nothing to show</span>
          </div>
        ) : (
          ListToDo?.map((li: TShare) => <ShareItem key={li.id} item={li} />)
        )}
      </div>
    </div>
  );
}

export default ShareList;
