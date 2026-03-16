import { useAppSelector } from "@/lib/hook";
import { TPeople } from "@/modules/people/PeopleList.slice";

export const SelectedShareItem = ({
  peopleId,
  incomeAmount,
  outcomeAmount,
}: {
  peopleId: string;
  incomeAmount?: string;
  outcomeAmount?: string;
}) => {
  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.PeopleList) || {};

  const peopleAcoreToId = ListPeople.filter((share) => share.id == peopleId)[0];

  return (
    <div className="flex justify-between w-full">
      <label>
        {peopleAcoreToId && peopleAcoreToId.title}
      </label>
      <label className={`${incomeAmount ? "text-green-500" : "text-red-500"}`}>
        {incomeAmount || outcomeAmount}
      </label>
    </div>
  );
};

export default SelectedShareItem;
