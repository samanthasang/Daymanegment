import useShareList from "@/lib/Hooks/Lists/Share/UseShareList.component";
import SelectedPeopleItem from "./SelectedPeopleItem.component";

export const SelectedShareItem = ({ id }: { id: string }) => {
  const { ListShareAll } = useShareList();

  const share = ListShareAll.filter((share) => share.id == id)[0];

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-start flex-1 gap-x-0.5 w-fit">
        <label className="text-nowrap">{share && share.title}</label>
        {`/`}
        {share && <SelectedPeopleItem id={share.peopleId} />}
      </div>
      <label
        className={`${share && share.incomeAmount ? "text-success" : "text-red-500"}`}
      >
        {(share && share.incomeAmount) || (share && share.outcomeAmount)}
      </label>
    </div>
  );
};

export default SelectedShareItem;
