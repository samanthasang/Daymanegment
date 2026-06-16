"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import ShareListActivities from "@/lib/Hooks/Lists/Share/ShareListActivities.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import UseLangComponent from "@/lib/Hooks/UseLangComponent.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function ShareListList() {
  const { ListShareFriends, ListShareForgot, selectedShare } = useShareList();
  const { DelItem, SelectItem, DuplicateTodayItem } = ShareListActivities();
  const t: any = UseLangComponent("Shares");

  return (
    <>
      <ListSection
        drawerType="Shares"
        formType="Add"
        drawerTitle={t.single}
        selectedID={selectedShare && !!selectedShare.id}
        ListFilteredTilte={t.title}
        ListForgotTilte={t.forgotTilte}
        ListFiltered={ListShareFriends as []}
        ListForgot={ListShareForgot as []}
        withShop
        withBalance
      />
      <SelectedSection
        drawerType="Shares"
        formType="Edit"
        drawerTitle={t.single}
        DelItem={() => DelItem(selectedShare.id, selectedShare.title)}
        SelectItem={() => SelectItem()}
        DuplicateTodayItem={() => DuplicateTodayItem({ ...selectedShare })}
        selected={selectedShare}
      />
    </>
  );
}

export default ShareListList;
