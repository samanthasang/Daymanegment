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
  } = useAppSelector((state) => state.Shares) || [];

  const People = useAppSelector((state) => state.Friends) || {};

  const selectedPeople = People?.selectedPeople as TPeople;
  const ListPeople = People?.ListPeople as TPeople[];

  // const [listHasShare, setListHasShare] = useState<TPeople[]>(ListPeople);
  // const [listHasNoShare, setListHasNoShare] = useState<TPeople[]>(ListPeople);

  // useEffect(() => {
  //   const filterdList = () => {
  //     let filterArrayHasShare = ListPeople || [];
  //     let filterArrayHasNoShare = ListPeople || [];

  //     filterArrayHasShare = ListPeople.filter(
  //       (people) =>
  //         ListShare.filter((share) => share.peopleId == people.id).length > 0
  //     );
  //     filterArrayHasNoShare = ListPeople.filter(
  //       (people) =>
  //         ListShare.filter((share) => share.peopleId == people.id).length == 0
  //     );

  //     return { filterArrayHasShare, filterArrayHasNoShare };
  //   };
  //   const { filterArrayHasNoShare, filterArrayHasShare } = filterdList();

  //   ListPeople && setListHasNoShare(filterArrayHasNoShare);
  //   ListPeople && setListHasShare(filterArrayHasShare);
  // }, [ListShare, ListPeople]);

  const listHasShare: TPeople[] = ListPeople.filter(
    (people) => people.shareList && people?.shareList.length > 0 && people
  );
  const listHasNoShare: TPeople[] = ListPeople.filter(
    (people) => people.shareList && people?.shareList.length == 0 && people
  );

  return { listHasShare, listHasNoShare, ListPeople, selectedPeople };
}

export default usePeopleList;
