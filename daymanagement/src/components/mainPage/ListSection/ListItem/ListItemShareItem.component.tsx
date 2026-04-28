import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";

export const ListItemShare = ({ peopleId }: { peopleId?: string }) => {
  const { ListShareAll: ListShare } = useShareList();

  const peopleAcoreToId =
    ListShare && ListShare.filter((share) => share.peopleId == peopleId);
  return (
    <label className="cursor-pointer px-2 py-1 rounded-2xl bg-white/15">
      Shares : {peopleAcoreToId && peopleAcoreToId.length}
    </label>
  );
};

export default ListItemShare;
