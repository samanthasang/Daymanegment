"use client";
import { TPeople } from "@/modules/people/PeopleList.slice";
import { useAppSelector } from "../../lib/hook";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ICategotySelect {
  onClickChange: (category: string) => void;
  value?: string;
}

function PeopleSelectComponent({ onClickChange, value }: ICategotySelect) {
  const {
    ListPeople,
  }: {
    ListPeople: TPeople[];
    selectedPeople: {};
  } = useAppSelector((state) => state.PeopleList) || {};

  return (
    <Select onValueChange={(e) => e && onClickChange(e)} value={value || ""}>
      <SelectTrigger className="w-full border-white rounded py-1">
        <SelectValue placeholder="People" />
      </SelectTrigger>
      <SelectContent>
        {ListPeople.map((people, index) => (
          <SelectItem key={index} value={people.id}>
            {people.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default PeopleSelectComponent;
