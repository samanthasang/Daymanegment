"use client"
import { TTag } from "@/modules/tag/TagList.slice";
import { useAppSelector } from "../../lib/hook";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ICategotySelect {
  onClickChange: (category: string) => void;
  value?: string
}

function TagSelectComponent({ onClickChange, value } : ICategotySelect) {
  
    const { ListTag }: {
      ListTag: TTag[];
      selectedTag: {};
  } = useAppSelector((state) => state.TagList) || [];
   
  return (
    <Select  onValueChange={(e) => e && onClickChange(e)} value={value || ""}>
      <SelectTrigger className="w-full border-white rounded py-1">
        <SelectValue placeholder="Tag" />
      </SelectTrigger>
          <SelectContent>
            {ListTag.map((tag, index) => 
        <SelectItem key={index} value={tag.title}>{tag.title}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

export default TagSelectComponent;
