"use client"
import { TCategory } from "@/modules/category/categoryList.slice";
import { useAppSelector } from "../../lib/hook";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface ICategotySelect {
  onClickChange: (category: string) => void;
  value?: string
}

function CategotySelectComponent({ onClickChange, value } : ICategotySelect) {
  
  const { ListCategory }: {
    ListCategory: TCategory[];
    selectedCategory: {};
  } = useAppSelector((state) => state.CategoryList) || [];
   
  return (
    <Select  onValueChange={(e) => e && onClickChange(e)} value={value || ""}>
      <SelectTrigger className="w-full border-white rounded py-1">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
          <SelectContent>
            {ListCategory.map((category, index) => 
        <SelectItem key={index} value={category.title}>{category.title}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}

export default CategotySelectComponent;
