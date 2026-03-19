"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import usePeopleList from "@/lib/Hooks/Lists/Share/UsePeopleList.component";
import { cn } from "@/lib/utils";
import { TPeople } from "@/modules/people/PeopleList.slice";
import PeopleItem from "../peopleItem/PeopleItem.component";

function ShareListWithShare() {
  const People = useAppSelector((state) => state.PeopleList) || {};

  const selectedPeople = People?.selectedPeople as TPeople;

  const { listHasShare } = usePeopleList();

  return (
    <>
      <div
        className={cn(
          "flex flex-col h-full gap-y-2",
          (listHasShare && listHasShare.length !== 0) || false
            ? "scroll-m-0 overflow-y-scroll"
            : ""
        )}
      >
        {listHasShare?.length == 0 ? (
          <EmptyList />
        ) : (
          listHasShare?.map((li: TPeople) => (
            <PeopleItem
              key={li.id}
              item={li}
              hasShare
              selectedID={selectedPeople && selectedPeople.id}
            />
          ))
        )}
      </div>
      <ListMenuBottom
        listTitle="Friends"
        drawerType="PeopleList"
        formType="Add PeopleList"
        selectedID={!!selectedPeople}
        ListInfo={`${listHasShare && listHasShare.length}`}
      />
    </>
  );
}

export default ShareListWithShare;
