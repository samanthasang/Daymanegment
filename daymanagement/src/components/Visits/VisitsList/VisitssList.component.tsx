"use client"
import useVisitList from "@/lib/Hooks/Lists/UseVisitList.component";
import { cn } from "@/lib/utils";
import { TVisit } from "@/modules/visitsList/visit.slice";
import { VisitsItem } from "../VisitsItem/VisitsItem.component";

function VisitsList() {
  const ListVisit = useVisitList();

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-3 col-span-2 h-auto",
        ListVisit && ListVisit.length !== 0
          ? "scroll-m-0 overflow-y-scroll"
          : ""
      )}
    >
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
        {ListVisit?.length == 0 ? (
          <div className="flex items-center justify-center rounded-2xl h-full">
            <span>There is nothing to show</span>
          </div>
        ) : (
          ListVisit?.map((li: TVisit) => <VisitsItem key={li.id} item={li} />)
        )}
      </div>
    </div>
  );
}

export default VisitsList;
