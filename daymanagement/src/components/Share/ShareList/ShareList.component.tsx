"use client";
import ListSection from "@/components/mainPage/ListSection/ListSection.component";
import ShareListActivities from "@/lib/Hooks/Lists/Share/ShareListActivities.component";
import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import dynamic from "next/dynamic";

const SelectedSection = dynamic(
  () =>
    import("@/components/mainPage/SelectedSection/SelectedSection.component"),
  { ssr: false }
);

function ShareListList({ peopleId }: { peopleId?: string }) {
  const { ListShareFriends, ListShareForgot, selectedShare } = useShareList();
  const { DelItem, SelectItem } = ShareListActivities();

  const ListShareWithId =
    ListShareFriends && peopleId
      ? ListShareFriends.filter((share) => share.peopleId == peopleId)
      : ListShareFriends;

  const ListShareForgotWithId =
    ListShareForgot && peopleId
      ? ListShareForgot.filter((share) => share.peopleId == peopleId)
      : ListShareForgot;

  return (
    <>
      <ListSection
        drawerType="ShareList"
        formType="Add"
        selectedID={selectedShare && !!selectedShare.id}
        ListFilteredTilte="Shares"
        ListForgotTilte="Old Shares"
        ListFiltered={ListShareWithId as []}
        ListForgot={ListShareForgotWithId as []}
        withShop
        withBalance
      />
      <SelectedSection
        drawerType="ShareList"
        formType="Edit"
        DelItem={() => DelItem()}
        SelectItem={() => SelectItem()}
        selected={selectedShare}
      />
    </>
  );
}

export default ShareListList;
