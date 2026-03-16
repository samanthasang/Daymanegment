"use client";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListMenuBottom from "@/components/mainPage/ListContainer/ListMenuBottom.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import SpendsListActivities from "@/lib/Hooks/Lists/Spends/SpendsListActivities.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import { cn } from "@/lib/utils";
import { selectSpendsList, TSpends } from "@/modules/spends/spends.slice";
import { useEffect } from "react";
import SpendsItem from "../SpendsItem/SpendsItem.component";

function SpendsList() {
  const dispatch = useAppDispatch();

  const ListSpends = useSpendsList();
  const Spends = useAppSelector((state) => state.SpendsList);

  const selectedSpends = Spends?.selectedSpends as TSpends;

  const { DelItem, SelectItem, SelectWithId } = SpendsListActivities();

  useEffect(() => {
    ListSpends.length == 0 && dispatch(selectSpendsList(""));
  }, [ListSpends]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer listTitle="Spends" selectedID={!!selectedSpends}>
        <div
          className={cn(
            "flex flex-col h-full gap-y-1",
            (ListSpends && ListSpends.length !== 0) || false
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListSpends?.length == 0 ? (
            <EmptyList />
          ) : (
            ListSpends?.map((li: TSpends) => (
              <SpendsItem
                key={li.id}
                item={li}
                selectedID={selectedSpends && selectedSpends.id}
              />
            ))
          )}
        </div>
        <ListMenuBottom
          listTitle="Spends"
          drawerType="SpendsList"
          formType="Add Spends"
          selectedID={!!selectedSpends}
          ListInfo={`${ListSpends?.filter((spends) => spends.income == true).length} | ${ListSpends?.filter((spends) => spends.income != true).length}`}
        />
      </ListContainer>
      {selectedSpends && (
        <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
          <SelectedItem {...selectedSpends} />
          <SelectedMenuBottom
            DelItem={DelItem}
            SelectItem={SelectItem}
            drawerType="SpendsList"
            formType="Edit Spends"
          />
        </div>
      )}
    </div>
  );
}

export default SpendsList;
