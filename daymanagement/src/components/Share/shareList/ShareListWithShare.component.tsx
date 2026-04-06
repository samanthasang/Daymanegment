"use client";
import ListContent from "@/components/mainPage/ListContainer/ListContent.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import usePeopleList from "@/lib/Hooks/Lists/Share/UsePeopleList.component";
import { TPeople } from "@/modules/people/PeopleList.slice";
import PeopleItem from "../peopleItem/PeopleItem.component";

function ShareListWithShare() {
  const { listHasShare, selectedPeople } = usePeopleList();

  return (
    <>
      <ListContent ListCount={listHasShare && listHasShare.length}>
        {listHasShare?.map((li: TPeople) => (
          <PeopleItem
            key={li.id}
            item={li}
            hasShare
            selectedID={selectedPeople && selectedPeople.id}
          />
        ))}
      </ListContent>
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
