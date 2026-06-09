"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import SpendsListActivities from "@/lib/Hooks/Lists/Spends/SpendsListActivities.component";
import useSpendsList from "@/lib/Hooks/Lists/Spends/UseSpendsList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
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
  const t: any = UseLangComponent("Spends");

  return (
    <>
      <ListSection
        drawerType="Spends"
        formType="Add"
        drawerTitle={t.single}
        selectedID={selectedSpends && !!selectedSpends.id}
        ListFilteredTilte={t.title}
        ListForgotTilte={t.forgotTilte}
        ListFiltered={ListSpendsFiltered as []}
        ListForgot={ListSpendsForgot as []}
        withBalance
        withShop
      />
      <SelectedSection
        drawerType="Spends"
        formType="Edit"
        drawerTitle={t.single}
        DelItem={() => DelItem(selectedSpends.id, selectedSpends.title)}
        SelectItem={() => SelectItem()}
        DuplicateTodayItem={() => DuplicateTodayItem({ ...selectedSpends })}
        selected={selectedSpends}
      />
    </>
  );
}

export default SpendsList;
