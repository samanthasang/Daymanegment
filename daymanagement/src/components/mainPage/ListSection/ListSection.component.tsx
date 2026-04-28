"use client";
import ListContainer from "@/components/mainPage/ListSection/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListSection/ListContainer/ListTitle.component";
import ListTitleContainer from "@/components/mainPage/ListSection/ListContainer/ListTitleContainer.component";
import { useState } from "react";
import CurrentList from "./CurrentList.component";

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
  withpriority,
  withShop,
  withBalance,
  withFinish,
  withComplateSort,
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
  withpriority?: boolean;
  withShop?: boolean;
  withBalance?: boolean;
  withFinish?: boolean;
  withComplateSort?: boolean;
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
      <CurrentList
        listTitle={!forgot ? ListFilteredTilte : ListForgotTilte}
        drawerType={drawerType}
        formType={formType}
        List={!forgot ? ListFiltered : ListForgot}
        withpriority={withpriority}
        withShop={withShop}
        withBalance={withBalance}
        withComplateSort={withComplateSort}
        withFinish={withFinish}
      />
    </ListContainer>
  );
}

export default ListSection;
