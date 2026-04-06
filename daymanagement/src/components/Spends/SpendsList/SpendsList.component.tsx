"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import SelectedSpendsList from "../SpendsItem/SelectedSpendsList.component";
import SpendsListCurrent from "./SpendsListCurrent.component";

function SpendsList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();

  const { ListSpendsForgot, ListSpendsFiltered, selectedSpends } =
    useSpendsList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedSpends) || isSMMin) && (
        <ListContainer selectedID={!!selectedSpends}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Spends"
          />
          {!forgot ? (
            <SpendsListCurrent
              ListSpends={ListSpendsFiltered}
              selectedID={selectedSpends && selectedSpends.id}
            />
          ) : (
            <SpendsListCurrent
              ListSpends={ListSpendsForgot}
              selectedID={selectedSpends && selectedSpends.id}
            />
          )}
        </ListContainer>
      )}
      {selectedSpends && <SelectedSpendsList />}
    </div>
  );
}

export default SpendsList;
