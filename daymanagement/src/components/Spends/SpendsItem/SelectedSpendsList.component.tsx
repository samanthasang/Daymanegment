"use client";
import SelectedContainer from "@/components/mainPage/selectedItem/SelectedContainer.component";
import SelectedItem from "@/components/mainPage/selectedItem/SelectedItem.component";
import SelectedMenuBottom from "@/components/mainPage/selectedItem/SelectedMenuBottom.component";
import SpendsListActivities from "@/lib/Hooks/Lists/Spends/SpendsListActivities.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";

function SelectedSpendsList() {
  const { DelItem, SelectItem } = SpendsListActivities();

  const { selectedSpends } = useSpendsList();

  return (
    <SelectedContainer>
      <SelectedItem {...selectedSpends} />
      <SelectedMenuBottom
        DelItem={DelItem}
        SelectItem={SelectItem}
        drawerType="SpendsList"
        formType="Edit Spends"
      />
    </SelectedContainer>
  );
}

export default SelectedSpendsList;
