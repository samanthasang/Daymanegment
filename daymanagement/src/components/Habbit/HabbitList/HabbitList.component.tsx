"use client";
import ListContainer from "@/components/mainPage/ListContainer/ListContainer.component";
import ListTitle from "@/components/mainPage/ListContainer/ListTitle.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import UseHabbitList from "@/lib/Hooks/Lists/Habbit/UseHabbitList.component";
import { selectHabbitList, Thabbit } from "@/modules/habbitList/habbit.slice";
import { useEffect, useState } from "react";
import SelectedHabbitList from "../HabbitItem/SelectedHabbitList.component";
import HabbitListCurrent from "./HabbitListCurrent.component";

function HabbitList() {
  const dispatch = useAppDispatch();
  const [forgot, setForgot] = useState(false);

  const Habbit = useAppSelector((state) => state.habbitList);

  const selectedHabbit = Habbit?.selectedhabbit as Thabbit;

  const ListHabbit = UseHabbitList();
  const ListHabbitAll = Habbit?.ListHabbit as Thabbit[];
  const ListMyHabbit = ListHabbitAll.filter((a) => a.score > 9);
  const ListHabbitForgot = ListHabbitAll.filter((a) => a.score <= 9);

  useEffect(() => {
    ListHabbit.length == 0 && dispatch(selectHabbitList(""));
  }, [ListHabbit]);

  return (
    <div className="flex flex-row gap-x-3 flex-1 w-full mx-auto">
      <ListContainer selectedID={!!selectedHabbit}>
        <ListTitle
          forgot={forgot}
          setForgot={(f) => setForgot(f)}
          title="Habbits"
        />
        {!forgot ? (
          <HabbitListCurrent
            ListHabbit={ListMyHabbit}
            selectedID={selectedHabbit && selectedHabbit.id}
          />
        ) : (
          <HabbitListCurrent
            ListHabbit={ListHabbitForgot}
            selectedID={selectedHabbit && selectedHabbit.id}
          />
        )}
      </ListContainer>
      {selectedHabbit && <SelectedHabbitList />}
    </div>
  );
}

export default HabbitList;
