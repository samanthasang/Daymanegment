import { useAppSelector } from "@/lib/hook";
import { TPeople } from "@/modules/people/PeopleList.slice";

export const SelectedPeopleItem = ({ id }: { id: string }) => {
  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.Friends) || {};

  const peopleAcoreToId = ListPeople.filter((share) => share.id == id)[0];

  return (
    <div className="flex justify-between w-full text-blue-500">
      <label>{peopleAcoreToId && peopleAcoreToId.title}</label>
    </div>
  );
};

export default SelectedPeopleItem;
