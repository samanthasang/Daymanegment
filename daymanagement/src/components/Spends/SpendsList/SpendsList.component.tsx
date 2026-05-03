"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import SpendsListActivities from "@/lib/Hooks/Lists/Spends/SpendsListActivities.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function SpendsList() {
  const { ListSpendsFiltered, ListSpendsForgot, selectedSpends } =
    useSpendsList();
  const { DelItem, SelectItem } = SpendsListActivities();

  return (
    <>
      <ListSection
        drawerType="SpendsList"
        formType="Add"
        selectedID={selectedSpends && !!selectedSpends.id}
        ListFilteredTilte="Spends"
        ListForgotTilte="Old Spends"
        ListFiltered={ListSpendsFiltered as []}
        ListForgot={ListSpendsForgot as []}
        withBalance
        withShop
      />
      <SelectedSection
        drawerType="SpendsList"
        formType="Edit"
        DelItem={() => DelItem()}
        SelectItem={() => SelectItem()}
        DuplicateItem
        selected={selectedSpends}
      />
    </>
  );
}

export default SpendsList;
