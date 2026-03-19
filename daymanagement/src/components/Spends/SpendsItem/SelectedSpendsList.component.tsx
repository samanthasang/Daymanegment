"use client";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import { useAppSelector } from "@/lib/hook";
import SpendsListActivities from "@/lib/Hooks/Lists/Spends/SpendsListActivities.component";
import { TSpends } from "@/modules/spends/spends.slice";

function SelectedSpendsList() {
  const Spends = useAppSelector((state) => state.SpendsList);

  const selectedSpends = Spends?.selectedSpends as TSpends;

  const { DelItem, SelectItem } = SpendsListActivities();

  return (
    <div className="flex flex-col w-full flex-1 bg-secondary rounded-2xl relative">
      <SelectedItem {...selectedSpends} />
      <SelectedMenuBottom
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="SpendsList"
        formType="Edit Spends"
      />
    </div>
  );
}

export default SelectedSpendsList;
