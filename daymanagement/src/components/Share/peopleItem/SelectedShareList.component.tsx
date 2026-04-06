"use client";
import SelectedContainer from "@/components/mainPage/selectedItem/SelectedContainer.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import usePeopleList from "@/lib/Hooks/Lists/Share/UsePeopleList.component";
import { selectPeopleList } from "@/modules/people/PeopleList.slice";
import { TShare } from "@/modules/share/share.slice";

function SelectedShareList() {
  const dispatch = useAppDispatch();
  const { selectedPeople } = usePeopleList();

  const {
    ListShare,
  }: {
    ListShare: TShare[];
  } = useAppSelector((state) => state.ShareList) || {};

  const incomeArray = ListShare?.filter(
    (share) => share.peopleId == selectedPeople.id && share.income
  ).reduce((acc, obj) => {
    if (obj.income && obj.incomeAmount) {
      return acc + +obj.incomeAmount;
    }
    return acc;
  }, 0);
  const outComeArray = ListShare?.filter(
    (share) => share.peopleId == selectedPeople.id && !share.income
  ).reduce((acc, obj) => {
    if (!obj.income && obj.outcomeAmount) {
      return acc + +obj.outcomeAmount;
    }
    return acc;
  }, 0);

  const total = ListShare?.filter(
    (share) => share.peopleId == selectedPeople.id
  ).reduce((acc, obj) => {
    if (obj.income && obj.incomeAmount) {
      return acc + +obj.incomeAmount;
    }
    if (!obj.income && obj.outcomeAmount) {
      return acc - +obj.outcomeAmount;
    }
    return acc;
  }, 0);

  const SelectItem = () => {
    dispatch(selectPeopleList(""));
  };

  return (
    <SelectedContainer>
      <SelectedItem
        drawerType="PeopleList"
        total={total}
        totalIncome={incomeArray}
        totalOuCome={outComeArray}
        formType={`Edit ${selectedPeople.title}`}
        {...selectedPeople}
      />
      <SelectedMenuBottom
        SelectItem={SelectItem}
        drawerType="PeopleList"
        formType="Add Share"
      />
    </SelectedContainer>
  );
}

export default SelectedShareList;
