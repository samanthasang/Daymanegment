"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { DayUnixFormat, DayUnixFormatNow } from "@/lib/Hooks/UseDayJS";
import useMediaQueryValues from "@/lib/Hooks/useMediaQuery";
import { useState } from "react";
import SelectedHabbitList from "../HabbitItem/SelectedHabbitList.component";
import HabbitListCurrent from "./HabbitListCurrent.component";

function HabbitList() {
  const [forgot, setForgot] = useState(false);
  const { isSX, isSMMin } = useMediaQueryValues();

  const { ListHabbitNew, ListMyHabbit, selectedHabbit } = UseHabbitList();

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      {((isSX && !selectedHabbit) || isSMMin) && (
        <ListContainer selectedID={!!selectedHabbit}>
          <ListTitle
            forgot={forgot}
            setForgot={(f) => setForgot(f)}
            title="Habbits"
            titleSec="New Habbits"
            listCount={
              ListMyHabbit.length > 0
                ? ListMyHabbit?.filter(
                    (todo) =>
                      DayUnixFormat(+todo.completeUpdate, "DD") !=
                      DayUnixFormatNow("DD")
                  ).length
                : undefined
            }
            secListCount={
              ListHabbitNew.length > 0
                ? ListHabbitNew?.filter(
                    (todo) =>
                      DayUnixFormat(+todo.completeUpdate, "DD") !=
                      DayUnixFormatNow("DD")
                  ).length
                : undefined
            }
          />
          {!forgot ? (
            <HabbitListCurrent
              ListHabbit={ListMyHabbit}
              selectedID={selectedHabbit && selectedHabbit.id}
            />
          ) : (
            <HabbitListCurrent
              ListHabbit={ListHabbitNew}
              selectedID={selectedHabbit && selectedHabbit.id}
            />
          )}
        </ListContainer>
      )}
      {selectedHabbit && <SelectedHabbitList />}
    </div>
  );
}

export default HabbitList;
