"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { selectPeopleList, TPeople } from "@/modules/people/PeopleList.slice";
import { Eye, User } from "lucide-react";
import { useRouter } from "next/navigation";

export const SelectedPeopleItem = ({ id }: { id: string }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.Friends) || {};

  const peopleAcoreToId = ListPeople.filter((share) => share.id == id)[0];

  return (
    <div className="w-full h-10 flex flex-row items-center justify-between rounded-3xl">
      <div className="flex gap-x-1 items-center">
        <User width={16} height={16} />
        <label>{`${peopleAcoreToId && peopleAcoreToId.title}`}</label>
      </div>
      <div className="flex gap-x-1">
        <Button
          onClick={(e) => {
            e && e.preventDefault();
            id &&
              dispatch(
                selectPeopleList(peopleAcoreToId.id),
                router.push(`/friends`)
              );
          }}
          size="sm"
        >
          <Eye width={16} height={16} />
        </Button>
      </div>
    </div>
  );
};

export default SelectedPeopleItem;
