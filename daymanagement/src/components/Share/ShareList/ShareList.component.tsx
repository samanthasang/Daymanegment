"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { selectPeopleList, TPeople } from "@/modules/people/PeopleList.slice";
import { useState } from "react";
import ShareListWithOutShare from "./ShareListWithOutShare.component";
import ShareListWithShare from "./ShareListWithShare.component";

function ShareList() {
  const [forgot, setForgot] = useState(false);
  const dispatch = useAppDispatch();
  const People = useAppSelector((state) => state.PeopleList) || {};

  const selectedPeople = People?.selectedPeople as TPeople;

  const SelectItem = () => {
    dispatch(selectPeopleList(""));
  };

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedPeople && !forgot}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Friends"
        />
        {!forgot ? <ShareListWithShare /> : <ShareListWithOutShare />}
      </ListContainer>
      {selectedPeople && !forgot && (
        <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
          <SelectedItem
            drawerType="PeopleList"
            formType={`Edit ${selectedPeople.title}`}
            {...selectedPeople}
          />
          <SelectedMenuBottom
            SelectItem={SelectItem}
            drawerType="PeopleList"
            formType="Add Share"
          />
        </div>
      )}
    </div>
  );
}

export default ShareList;
