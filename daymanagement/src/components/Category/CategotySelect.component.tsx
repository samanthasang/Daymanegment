"use client";
import { TCategory } from "@/modules/category/categoryList.slice";
import { useAppSelector } from "../../lib/hook";
import { SelectButtonGroup } from "../ui/SelectButtonGroup";
import { DrawerDialogDemo } from "../Drawer/DrawerComponent";
import { Edit } from "../icons";
import { DialogTrigger } from "../ui/dialog";

interface ICategotySelect {
  className?: string;
  required?: boolean;
  errors?: boolean;
  onValueChange: (data: string) => void;
  value?: string;
}

function CategotySelectComponent({
  required,
  errors = false,
  onValueChange,
  value,
}: ICategotySelect) {
  
  const {
    ListCategory,
  }: {
    ListCategory: TCategory[];
    selectedCategory: {};
  } = useAppSelector((state) => state.CategoryList) || [];

  return (
    <SelectButtonGroup
      title="Category"
      name="category"
      errors={errors}
      placeholder="Choose Category"
      required={required}
      itemArray={ListCategory}
      onValueChange={(e) => e && onValueChange(e)}
      value={value || ""}
    >
      <DrawerDialogDemo drawerType={"TagList"} formType="Add Tag">
        <DialogTrigger asChild>
          <div className="text-red-400 w-8 h-8 flex justify-center items-center rounded-r-xl border border-input bg-transparent text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
            <Edit />
          </div>
        </DialogTrigger>
      </DrawerDialogDemo>
    </SelectButtonGroup>
  );
}

export default CategotySelectComponent;
