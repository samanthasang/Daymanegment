"use client";
import ListContent from "@/components/mainPage/ListContainer/ListContent.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import usePeopleList from "@/lib/Hooks/Lists/Share/UsePeopleList.component";
import { TPeople } from "@/modules/people/PeopleList.slice";
import PeopleItem from "../peopleItem/PeopleItem.component";

function ShareListWithOutShare() {
  const People = useAppSelector((state) => state.PeopleList) || {};

  const selectedPeople = People?.selectedPeople as TPeople;
  const { listHasNoShare } = usePeopleList();
  return (
    <>
      <ListContent ListCount={listHasNoShare && listHasNoShare.length}>
        {listHasNoShare?.map((li: TPeople) => (
          <PeopleItem
            key={li.id}
            item={li}
            selectedID={selectedPeople && selectedPeople.id}
          />
        ))}
      </ListContent>
      <ListMenuBottom
        listTitle="Friends"
        drawerType="PeopleList"
        formType="Add PeopleList"
        selectedID={!!selectedPeople}
        ListInfo={`${listHasNoShare && listHasNoShare.length}`}
      />
    </>
  );
}

export default ShareListWithOutShare;
