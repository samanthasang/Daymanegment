"use client";
import { TPeople } from "@/modules/people/PeopleList.slice";

export const PeopleItem = ({ item }: { item: TPeople }) => {

  return (
    <div className="w-full bg-primary p-3 rounded-2xl">
      <label>{item.title}</label>
    </div>
  );
};

export default PeopleItem;
