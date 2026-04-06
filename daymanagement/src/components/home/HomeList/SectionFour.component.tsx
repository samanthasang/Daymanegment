"use client";

import HabbitItem from "@/components/Habbit/HabbitItem/HabbitItem.componen";
import EmptyList from "@/components/mainPage/EmptyList/EmptyList.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import SpendsItem from "@/components/Spends/SpendsItem/SpendsItem.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";
import { cn } from "@/lib/utils";
import { Thabbit } from "@/modules/habbitList/habbit.slice";
import { TSpends } from "@/modules/spends/spends.slice";
import { useState } from "react";

function SectionFour() {
  const [forgot, setForgot] = useState(false);
  const { ListHabbitAll } = UseHabbitList();
  const { ListSpendsFiltered } = useSpendsList();

  return (
    <>
      <ListTitle
        forgot={forgot}
        setForgot={(f) => setForgot(f)}
        title="Habbits"
        titleSec="Spends"
        listCount={
          ListHabbitAll.length > 0
            ? ListHabbitAll?.filter(
                (todo) =>
                  DayUnixFormat(+todo.completeUpdate, "DD") ==
                  DayUnixFormatNow("DD")
              ).length
            : undefined
        }
        secListCount={
          ListSpendsFiltered.length > 0 ? ListSpendsFiltered?.length : undefined
        }
      />
      {!forgot ? (
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1",
            ListHabbitAll && ListHabbitAll.length > 6
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListHabbitAll?.length == 0 ? (
            <EmptyList />
          ) : (
            ListHabbitAll?.map((li: Thabbit) => (
              <HabbitItem key={li.id} item={li} />
            ))
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex flex-col h-full gap-y-2 ml-1",
            ListSpendsFiltered && ListSpendsFiltered.length > 6
              ? "scroll-m-0 overflow-y-scroll"
              : ""
          )}
        >
          {ListSpendsFiltered?.length == 0 ? (
            <EmptyList />
          ) : (
            ListSpendsFiltered?.map((li: TSpends) => (
              <SpendsItem key={li.id} item={li} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default SectionFour;
