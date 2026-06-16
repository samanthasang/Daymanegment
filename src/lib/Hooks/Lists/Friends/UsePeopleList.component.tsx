"use client";
import { useAppSelector } from "@/lib/hook";
import { TPeople } from "@/modules/people/PeopleList.slice";

function usePeopleList() {
  const People = useAppSelector((state) => state.Friends) || {};

  const selectedPeople = People?.selectedPeople as TPeople;
  const ListPeople = People?.ListPeople as TPeople[];

  const listHasShare: TPeople[] = ListPeople.filter(
    (people) => people.shareList && people?.shareList.length > 0 && people
  );
  const listHasNoShare: TPeople[] = ListPeople.filter(
    (people) => people.shareList && people?.shareList.length == 0 && people
  );

  return { listHasShare, listHasNoShare, ListPeople, selectedPeople };
}

export default usePeopleList;
