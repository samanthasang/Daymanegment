"use client";
import { useAppSelector } from "@/lib/hook";
import { TPeople } from "@/modules/people/PeopleList.slice";
import { TShare } from "@/modules/share/share.slice";
import { useEffect, useState } from "react";

function usePeopleList() {
  const {
    ListShare,
  }: {
    ListShare: TShare[];
    selectedShare: {};
  } = useAppSelector((state) => state.ShareList) || [];

  const People = useAppSelector((state) => state.PeopleList) || {};

  const selectedPeople = People?.selectedPeople as TPeople;
  const ListPeople = People?.ListPeople as TPeople[];

  const [listHasShare, setListHasShare] = useState<TPeople[] | undefined>(
    ListPeople
  );
  const [listHasNoShare, setListHasNoShare] = useState<TPeople[] | undefined>(
    ListPeople
  );

  useEffect(() => {
    const filterdList = () => {
      let filterArrayHasShare = ListPeople || [];
      let filterArrayHasNoShare = ListPeople || [];

      filterArrayHasShare = ListPeople.filter(
        (people) =>
          ListShare.filter((share) => share.peopleId == people.id).length > 0
      );
      filterArrayHasNoShare = ListPeople.filter(
        (people) =>
          ListShare.filter((share) => share.peopleId == people.id).length == 0
      );

      return { filterArrayHasShare, filterArrayHasNoShare };
    };
    const { filterArrayHasNoShare, filterArrayHasShare } = filterdList();

    ListPeople && setListHasNoShare(filterArrayHasNoShare);
    ListPeople && setListHasShare(filterArrayHasShare);
  }, [ListShare, ListPeople]);

  return { listHasShare, listHasNoShare, ListPeople, selectedPeople };
}

export default usePeopleList;
