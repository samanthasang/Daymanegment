"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import { useAppDispatch } from "@/lib/hook";
import usePeopleList from "@/lib/Hooks/Lists/Friends/UsePeopleList.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import { selectPeopleList } from "@/modules/people/PeopleList.slice";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function PeopleList() {
  const dispatch = useAppDispatch();
  const { listHasNoShare, listHasShare, selectedPeople } = usePeopleList();
  const { ListShareAll: ListShare } = useShareList();

  const SelectItem = () => {
    dispatch(selectPeopleList(""));
  };

  const incomeArray =
    selectedPeople &&
    ListShare &&
    ListShare?.filter(
      (share) => share.peopleId == selectedPeople.id && share.income
    ).reduce((acc, obj) => {
      if (obj.income && obj.incomeAmount) {
        return acc + +obj.incomeAmount;
      }
      return acc;
    }, 0);
  const outComeArray =
    selectedPeople &&
    ListShare &&
    ListShare?.filter(
      (share) => share.peopleId == selectedPeople.id && !share.income
    ).reduce((acc, obj) => {
      if (!obj.income && obj.outcomeAmount) {
        return acc + +obj.outcomeAmount;
      }
      return acc;
    }, 0);

  const total =
    selectedPeople &&
    ListShare &&
    ListShare?.filter((share) => share.peopleId == selectedPeople.id).reduce(
      (acc, obj) => {
        if (obj.income && obj.incomeAmount) {
          return acc + +obj.incomeAmount;
        }
        if (!obj.income && obj.outcomeAmount) {
          return acc - +obj.outcomeAmount;
        }
        return acc;
      },
      0
    );

  return (
    <>
      <ListSection
        drawerType="PeopleList"
        formType="Add PeopleList"
        selectedID={selectedPeople && !!selectedPeople.id}
        ListFilteredTilte="Friends"
        ListForgotTilte="New Friends"
        ListFilteredCount={listHasShare.length}
        ListForgotCount={listHasNoShare.length}
        ListFiltered={listHasShare as []}
        ListForgot={listHasNoShare as []}
      />
      <SelectedSection
        drawerType="PeopleList"
        formType="Edit Share"
        total={total}
        totalIncome={incomeArray}
        totalOuCome={outComeArray}
        SelectItem={SelectItem}
        selected={selectedPeople}
      />
    </>
  );
}

export default PeopleList;
