"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { selectPeopleList, TPeople } from "@/modules/people/PeopleList.slice";
import PeopleItem from "../peopleItem/PeopleItem.component";
import { cn } from "@/lib/utils";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";

function ShareList() {
  const dispatch = useAppDispatch();
  const People = useAppSelector((state) => state.PeopleList) || {};

  const selectedPeople = People?.selectedPeople as TPeople;
  const ListPeople = People?.ListPeople as TPeople[];
  const SelectItem = () => {
    dispatch(selectPeopleList(""));
  };
  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer listTitle="Friends" selectedID={!!selectedPeople}>
        <div
          className={cn(
            "flex flex-col h-full gap-y-2",
            (ListPeople && ListPeople.length !== 0) || false
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListPeople?.length == 0 ? (
            <EmptyList />
          ) : (
            ListPeople?.map((li: TPeople) => (
              <PeopleItem
                key={li.id}
                item={li}
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
          ListInfo={`${ListPeople && ListPeople.length}`}
        />
      </ListContainer>
      {selectedPeople && (
        <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
          <SelectedItem drawerType="PeopleList" {...selectedPeople} />
          <SelectedMenuBottom
            SelectItem={SelectItem}
            drawerType="ShareList"
            formType="Add Share"
          />
        </div>
      )}
    </div>
  );
}

export default ShareList;
