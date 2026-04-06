"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import useVisitList from "@/lib/Hooks/Lists/Visit/UseVisitList.component";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import SelectedVisitssList from "../VisitsItem/SelectedVisitssList.component";
import VisitssListCurrent from "./VisitssListCurrent.componen";

function VisitsList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();

  const { ListVisitFiltered, ListVisitForgot, selectedVisit } = useVisitList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedVisit) || isSMMin) && (
        <ListContainer selectedID={!!selectedVisit}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Visits"
            listCount={
              ListVisitFiltered.length > 0
                ? ListVisitFiltered?.filter((item) => !item.isComplete).length
                : undefined
            }
            secListCount={
              ListVisitForgot.length > 0
                ? ListVisitForgot?.filter((item) => !item.isComplete).length
                : undefined
            }
          />
          {!forgot ? (
            <VisitssListCurrent
              ListVisit={ListVisitFiltered}
              selectedID={selectedVisit && selectedVisit.id}
            />
          ) : (
            <VisitssListCurrent
              ListVisit={ListVisitForgot}
              selectedID={selectedVisit && selectedVisit.id}
            />
          )}
        </ListContainer>
      )}
      {selectedVisit && <SelectedVisitssList />}
    </div>
  );
}

export default VisitsList;
