"use client";
import ListContainer from "@/components/mainPage/ListSection/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import { useState } from "react";
import CurrentList from "./CurrentList.component";
import ListCurrentSpends from "./CurrentListSpends.component";

function ListSection({
  drawerType,
  formType,
  selectedID,
  ListFilteredTilte,
  ListForgotTilte,
  ListFilteredCount,
  ListForgotCount,
  ListFiltered,
  ListForgot,
}: {
  drawerType: string;
  formType: string;
  selectedID: boolean;
  ListFilteredTilte: string;
  ListForgotTilte: string;
  ListFilteredCount?: number;
  ListForgotCount?: number;
  ListFiltered: [];
  ListForgot: [];
}) {
  const [forgot, setForgot] = useState(false);

  return (
    <ListContainer selectedID={selectedID}>
      <ListTitleContainer>
        <ListTitle
          forgot={!forgot}
          setForgot={() => setForgot(false)}
          title={ListFilteredTilte}
          listCount={ListFilteredCount}
        />
        <ListTitle
          forgot={forgot}
          setForgot={() => setForgot(true)}
          title={ListForgotTilte}
          listCount={ListForgotCount}
        />
      </ListTitleContainer>
      {drawerType != "SpendsList" ? (
        <CurrentList
          listTitle={!forgot ? ListFilteredTilte : ListForgotTilte}
          drawerType={drawerType}
          formType={formType}
          List={!forgot ? ListFiltered : ListForgot}
        />
      ) : (
        <ListCurrentSpends
          listTitle={!forgot ? ListFilteredTilte : ListForgotTilte}
          drawerType={drawerType}
          formType={formType}
          List={!forgot ? ListFiltered : ListForgot}
        />
      )}
    </ListContainer>
  );
}

export default ListSection;
