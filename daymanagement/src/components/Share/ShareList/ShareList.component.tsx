"use client";
import { useAppSelector } from "@/lib/hook";
import useShareList from "@/lib/Hooks/Lists/UseShareList.component";
import { cn } from "@/lib/utils";
import { TPeople } from "@/modules/people/PeopleList.slice";
import PeopleItem from "../peopleItem/PeopleItem.component";

function ShareList() {
  const ListToDo = useShareList();
  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.PeopleList) || {};

  return (
    <div
      className={cn(
        "flex flex-col gap-4 px-3 w-full h-auto",
        ListToDo && ListToDo.length !== 0 ? "scroll-m-0 overflow-y-scroll" : ""
      )}
    >
      <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
        {ListPeople?.length == 0 ? (
          <div className="flex items-center justify-center rounded-2xl h-full">
            <span>There is nothing to show</span>
          </div>
        ) : (
          <div className=" w-full grid grid-cols-5 h-5 flex-1 gap-3">
            {ListPeople?.map((li: TPeople) => (
              <PeopleItem key={li.id} item={li} />
            ))}
          </div>
        )}
      </div>
      {/* <div className={cn("flex flex-col gap-4 px-3 col-span-2 h-auto")}>
        {ListToDo?.length == 0 ? (
          <div className="flex items-center justify-center rounded-2xl h-full">
            <span>There is nothing to show</span>
          </div>
        ) : (
          ListToDo?.map((li: TShare) => <ShareItem key={li.id} item={li} />)
        )}
      </div> */}
    </div>
  );
}

export default ShareList;
