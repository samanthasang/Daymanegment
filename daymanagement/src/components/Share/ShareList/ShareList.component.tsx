"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import usePeopleList from "@/lib/Hooks/Lists/Share/UsePeopleList.component";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import SelectedShareList from "../peopleItem/SelectedShareList.component";
import ShareListWithOutShare from "./ShareListWithOutShare.component";
import ShareListWithShare from "./ShareListWithShare.component";

function ShareList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();
  const { selectedPeople } = usePeopleList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedPeople) || isSMMin) && (
        <ListContainer selectedID={!!selectedPeople && !forgot}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Friends"
            titleSec="New Friends"
          />
          {!forgot ? <ShareListWithShare /> : <ShareListWithOutShare />}
        </ListContainer>
      )}
      {selectedPeople && !forgot && <SelectedShareList />}
    </div>
  );
}

export default ShareList;
