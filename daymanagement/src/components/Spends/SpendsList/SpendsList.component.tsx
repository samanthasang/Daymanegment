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
  const { DelItem, SelectItem, DuplicateTodayItem } = SpendsListActivities();

  return (
    <>
      <ListSection
        drawerType="Spends"
        formType="Add"
        drawerTitle="Spend"
        selectedID={selectedSpends && !!selectedSpends.id}
        ListFilteredTilte="Spends"
        ListForgotTilte="Old Spends"
        ListFiltered={ListSpendsFiltered as []}
        ListForgot={ListSpendsForgot as []}
        withBalance
        withShop
      />
      <SelectedSection
        drawerType="Spends"
        formType="Edit"
        drawerTitle="Spend"
        DelItem={() => DelItem(selectedSpends.id, selectedSpends.title)}
        SelectItem={() => SelectItem()}
        DuplicateTodayItem={() => DuplicateTodayItem({ ...selectedSpends })}
        selected={selectedSpends}
      />
    </>
  );
}

export default SpendsList;
